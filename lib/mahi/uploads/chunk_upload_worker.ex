defmodule Mahi.Uploads.ChunkUploadWorker do
  use GenServer

  alias Mahi.Uploads.NewChunkUpload

  def start_link(%NewChunkUpload{} = new_chunk_upload) do
    GenServer.start_link(__MODULE__, new_chunk_upload,
      name: {:via, Registry, {:chunk_upload_registry, new_chunk_upload.upload_id}}
    )
  end

  def init(%NewChunkUpload{} = new_chunk_upload) do
    state = %{
      total_chunks: new_chunk_upload.total_chunks,
      total_file_size: new_chunk_upload.total_file_size,
      file_name: new_chunk_upload.file_name,
      upload_chunk_files: Keyword.new(),
      project_id: new_chunk_upload.project_id
    }

    {:ok, state}
  end

  def handle_call({:process_chunk, %NewChunkUpload{} = new_chunk_upload}, _from, state) do
    %{
      upload_id: upload_id,
      chunk_number: chunk_number,
      file_path: original_chunk_file_path
    } = new_chunk_upload

    chunk_file_path =
      get_chunk_file_path(upload_id, chunk_number)
      |> create_chunk_file!()
      |> copy_chunk_to_chunk_file!(original_chunk_file_path)

    updated_chunk_file_paths =
      append_chunk_to_upload_chunk_files(
        state.upload_chunk_files,
        chunk_number,
        chunk_file_path
      )

    {:reply, :ok, %{state | upload_chunk_files: updated_chunk_file_paths}}
  end

  def handle_call(:build_chunks, _from, state) do
    case check_all_chunks_are_uploaded(state) do
      :ok ->
        # all chunks have been uploaded
        # sort chunks in proper order
        # read each chunk and merge it to the final file
        IO.inspect("reached")

      {:missing_chunks, missing_chunk_numbers} ->
        {:reply, {:missing_chunks, missing_chunk_numbers}, state}
    end
  end

  defp check_all_chunks_are_uploaded(state) do
    expected_chunks = Enum.to_list(1..state.total_chunks)

    current_chunks = Keyword.keys(state.chunk_file_paths)

    case diff = expected_chunks -- current_chunks do
      [] -> :ok
      _ -> {:missing_chunks, Enum.join(diff, ",")}
    end
  end

  defp copy_chunk_to_chunk_file!(chunk_file_path, original_chunk_file_path) do
    File.cp!(original_chunk_file_path, chunk_file_path)

    chunk_file_path
  end

  defp create_chunk_file!(chunk_file_path) do
    File.mkdir_p!(Path.dirname(chunk_file_path))

    chunk_file_path
  end

  defp get_chunk_file_path(upload_id, chunk_number) do
    Path.join(chunk_upload_dir(), upload_id)
    |> Path.join("#{chunk_number}")
  end

  defp append_chunk_to_upload_chunk_files(upload_chunk_files, chunk_number, chunk_file_path) do
    upload_chunk_files
    |> Keyword.put(String.to_atom("#{chunk_number}"), chunk_file_path)
  end

  defp sort_chunk_paths(a, b) do
    {aint, _} = Integer.parse(Atom.to_string(a |> elem(0)))
    {bint, _} = Integer.parse(Atom.to_string(b |> elem(0)))

    aint < bint
  end

  defp chunk_upload_dir do
    Application.get_env(:mahi, :chunk_upload_dir)
  end
end

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

  def handle_cast({:process_chunk, %NewChunkUpload{} = new_chunk_upload}, state) do
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
        state.upload_chunk_file_paths,
        chunk_number,
        chunk_file_path
      )

    {:noreply, %{state | chunk_file_paths: updated_chunk_file_paths}}
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
    |> Keyword.put("#{chunk_number}", chunk_file_path)
  end

  defp sort_chunk_paths(a, b) do
    {aint, _} = Integer.parse(Atom.to_string(a |> elem(0)))
    {bint, _} = Integer.parse(Atom.to_string(b |> elem(0)))

    aint < bint
  end

  defp chunk_upload_dir do
    Application.get_env(:oriio, :chunk_upload_dir)
  end
end

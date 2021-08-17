defmodule Mahi.Uploads do
  alias Mahi.Uploads.ChunkUploadWorker
  alias Mahi.Uploads.NewChunkUpload

  def upload(project_id, file_path) do
    file_metadata = get_file_metadata(file_path)
  end

  def upload_chunk(%NewChunkUpload{} = new_chunk_upload) do
    upload_pid =
      case Registry.lookup(:chunk_upload_registry, new_chunk_upload.upload_id) do
        [{pid, _}] ->
          pid

        [] ->
          case DynamicSupervisor.start_child(
                 :chunk_upload_dynamic_supervisor,
                 {ChunkUploadWorker, new_chunk_upload}
               ) do
            {:ok, pid} -> pid
            {:error, {:already_started, pid}} -> pid
          end
      end

    ChunkUploadWorker.proccess_chunk(upload_pid, new_chunk_upload)

    {:ok, :chunk_processing}
  end

  def merge_chunks(upload_id) do
    [{upload_pid, _}] = Registry.lookup(:chunk_upload_registry, upload_id)

    case ChunkUploadWorker.merge_chunks(upload_pid) do
      {:ok, merged_file_data} ->
        {:ok, merged_file_data}

      {:error, :missing_chunks, missing_chunk_numbers} ->
        {:error, :missing_chunks, missing_chunk_numbers}
    end
  end

  defp get_file_metadata(file_path) do
    %{file_path: file_path}
    |> parse_mime_type()
    |> parse_dimentions()
  end

  defp parse_mime_type(%{file_path: file_path} = file_metadata) do
    {type, subtype} = Mahi.Mime.check_magic_bytes(file_path)

    file_metadata
    |> Map.put(:mime_type, type)
    |> Map.put(:mime_subtype, subtype)
  end

  defp parse_dimentions(%{file_path: file_path, mime_type: :image} = file_metadata) do
  end

  defp parse_dimentions(file_metadata), do: file_metadata
end

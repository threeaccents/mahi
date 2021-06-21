defmodule Mahi.Uploads do
  alias Mahi.Uploads.ChunkUploadWorker
  alias Mahi.Uploads.NewChunkUpload

  def chunk_upload(%NewChunkUpload{} = new_chunk_upload) do
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

    GenServer.cast(upload_pid, {:process_chunk, new_chunk_upload})

    {:ok, :chunk_processing}
  end

  defp chunk_upload_dir do
    Application.get_env(:mahi, :chunk_upload_dir)
  end
end

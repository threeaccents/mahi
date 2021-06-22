defmodule MahiWeb.UploadController do
  use MahiWeb, :controller

  alias MahiWeb.UploadChunkRequest
  alias Mahi.Uploads.NewChunkUpload
  alias Mahi.Uploads

  action_fallback MahiWeb.FallbackController

  def upload_chunk(conn, params) do
    with {:ok, req} <- UploadChunkRequest.from_params(params),
         {:ok, new_chunk_upload} <- NewChunkUpload.from_request(req),
         {:ok, :chunk_processing} <- Uploads.upload_chunk(new_chunk_upload) do
      conn
      |> put_status(:created)
      |> put_view(MahiWeb.MessageView)
      |> render("show.json", message: "processing chunk")
    end
  end
end

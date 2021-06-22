defmodule MahiWeb.UploadChunkRequest do
  use Mahi.Schema

  import Ecto.Changeset

  @primary_key false
  embedded_schema do
    field :upload_id, :string
    field :project_id, :binary_id
    field :file_name, :string
    field :chunk_number, :integer
    field :total_chunks, :integer
    field :total_file_size, :integer
    field :file_path, :string
  end

  def from_params(params) do
    params = Map.put(params, "file_path", params["file"].path)

    %__MODULE__{}
    |> cast(params, [
      :upload_id,
      :file_name,
      :chunk_number,
      :total_chunks,
      :total_file_size,
      :file_path,
      :project_id
    ])
    |> validate_required([
      :upload_id,
      :file_name,
      :chunk_number,
      :total_chunks,
      :total_file_size,
      :file_path,
      :project_id
    ])
    |> apply_action(:update)
  end
end

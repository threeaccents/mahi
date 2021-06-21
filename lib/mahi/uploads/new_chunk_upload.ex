defmodule Mahi.Uploads.NewChunkUpload do
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

  def from_map(data) when is_map(data) do
    %__MODULE__{}
    |> changeset(data)
    |> apply_action(:update)
  end

  def changeset(%__MODULE__{} = new_chunk_upload, attrs) do
    new_chunk_upload
    |> cast(attrs, [
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
  end
end

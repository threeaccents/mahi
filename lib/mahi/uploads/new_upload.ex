defmodule Mahi.Uploads.NewUpload do
  use Mahi.Schema

  @primary_key false
  embedded_schema do
    field :project_id, Ecto.UUID
    field :file_name, :string
    field :file_path, :string
    field :size, :integer
    field :width, :integer
    field :height, :integer
    field :mime, :string
    field :mime_type, :string
    field :extension, :string
  end
end

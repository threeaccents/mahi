defmodule Mahi.Projects.ProjectSchema do
  use Mahi.Schema

  import Ecto.Changeset

  schema "projects" do
    field :cdn_url, :string
    field :name, :string
    field :storage_access_key, :string
    field :storage_bucket, :string
    field :storage_endpoint, :string
    field :storage_engine, :string
    field :storage_secret_key, :string
    field :storage_region, :string

    timestamps()
  end

  def changeset(project, new_project) do
    project
    |> cast(Map.from_struct(new_project), [
      :name,
      :storage_access_key,
      :storage_secret_key,
      :storage_bucket,
      :storage_endpoint,
      :storage_engine,
      :cdn_url,
      :storage_region,
      :organization_id
    ])
    |> validate_required([
      :name,
      :storage_access_key,
      :storage_secret_key,
      :storage_bucket,
      :storage_engine,
      :cdn_url,
      :organization_id
    ])
  end
end

defmodule Mahi.Projects.NewProject do
  use Mahi.Schema

  embedded_schema do
    field :cdn_url, :string
    field :name, :string
    field :storage_access_key, :string
    field :storage_bucket, :string
    field :storage_endpoint, :string
    field :storage_engine, :string
    field :storage_secret_key, :string
    field :storage_region, :string
  end
end

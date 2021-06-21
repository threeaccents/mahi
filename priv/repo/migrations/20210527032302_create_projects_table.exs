defmodule Mahi.Repo.Migrations.CreateUserOrganizationPivotTable do
  use Ecto.Migration

  def change do
    create table(:projects, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")

      add :name, :text, null: false

      add :storage_access_key, :text, null: false
      add :storage_bucket, :text, null: false
      add :storage_endpoint, :text
      add :storage_engine, :text, null: false
      add :storage_secret_key, :text, null: false
      add :storage_region, :text

      timestamps()
    end
  end
end

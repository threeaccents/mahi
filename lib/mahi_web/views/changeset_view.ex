defmodule MahiWeb.ChangesetView do
  use MahiWeb, :view

  @doc """
  Traverses and translates changeset errors.
  See `Ecto.Changeset.traverse_errors/2` and
  `MahiWeb.ErrorHelpers.translate_error/1` for more details.
  """
  def translate_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, &translate_error/1)
  end

  def render("error.json", %{changeset: changeset}) do
    # When encoded, the changeset returns its errors
    # as a JSON object. So we just pass it forward.
    %{
      http_code: 422,
      message: "validation error",
      request_id: Logger.metadata()[:request_id],
      errors: translate_errors(changeset),
      hola: "chino master supreme con pancakes"
    }
    |> ProperCase.to_camel_case()
  end
end

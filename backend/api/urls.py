from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.CreateAndGetNotes.as_view(), name="create_and_get_notes"),
    path("notes/delete/<int:pk>/", views.DeleteNote.as_view(), name="delete_note")
]
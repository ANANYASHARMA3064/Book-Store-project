import torch

# Fake book dataset
books = [
    {"title": "Harry Potter", "genre": "fantasy"},
    {"title": "Lord of the Rings", "genre": "fantasy"},
    {"title": "The Hobbit", "genre": "fantasy"},
    {"title": "Atomic Habits", "genre": "self-help"},
    {"title": "Deep Work", "genre": "self-help"},
    {"title": "Clean Code", "genre": "programming"},
    {"title": "The Pragmatic Programmer", "genre": "programming"},
]

print("Dataset loaded:", len(books))

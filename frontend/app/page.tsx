// Đặt ở đầu file
"use client";

import { useState, useEffect } from "react";

// URL của Flask API
const API_URL = "http://localhost:5000/api/todos";

// Định nghĩa Type cho Todo
interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect để tải dữ liệu (không thay đổi)
  useEffect(() => {
    async function fetchTodos() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error("Không thể kết nối đến máy chủ API");
        }
        const data: Todo[] = await res.json();
        setTodos(data);   
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Một lỗi không xác định đã xảy ra");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchTodos();
  }, []);

  // Các hàm xử lý (không thay đổi logic)
  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = newTodoText.trim();
    if (!text) return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text }),
      });
      if (!res.ok) throw new Error("Lỗi khi thêm công việc");

      const newTodo: Todo = await res.json();
      setTodos([newTodo, ...todos]);
      setNewTodoText("");
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  const handleToggleTodo = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "PUT" });
      if (!res.ok) throw new Error("Lỗi khi cập nhật công việc");

      const updatedTodo: Todo = await res.json();
      setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa công việc này?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Lỗi khi xóa công việc");

      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  // --- Hiển thị Giao diện (ĐÃ CẬP NHẬT STYLE) ---

  if (loading)
    return <div style={{ color: "#f5f5f5" }}>Đang tải dữ liệu...</div>;
  if (error) return <div style={{ color: "#ff8a80" }}>Lỗi: {error}</div>;

  return (
    <div
      style={{
        fontFamily: "Arial",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        // Style mới cho Dark Theme
        backgroundColor: "#1a1a1a", // Nền tối
        color: "#f5f5f5", // Chữ sáng
        minHeight: "100vh", // Đảm bảo toàn bộ màn hình tối
      }}
    >
      <h1 style={{ textAlign: "center" }}>Danh sách công việc</h1>

      {/* Form thêm công việc */}
      <form
        onSubmit={handleAddTodo}
        style={{ display: "flex", marginBottom: "20px" }}
      >
        <input
          type="text"
          value={newTodoText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewTodoText(e.target.value)
          }
          placeholder="Thêm công việc mới..."
          style={{
            flexGrow: 1,
            padding: "10px",
            fontSize: "16px",
            // Style mới cho Dark Theme
            backgroundColor: "#333",
            color: "#f5f5f5",
            border: "1px solid #555",
            borderRadius: "5px 0 0 5px", // Bo góc
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            fontSize: "16px",
            cursor: "pointer",
            // Style mới cho Dark Theme
            backgroundColor: "#007bff", // Nút màu xanh
            color: "white",
            border: "none",
            borderRadius: "0 5px 5px 0", // Bo góc
          }}
        >
          Thêm
        </button>
      </form>

      {/* Danh sách công việc */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo._id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 15px",
              marginBottom: "8px",
              borderRadius: "5px",
              // Style mới cho Dark Theme
              backgroundColor: "#2a2a2a", // Nền từng mục
              borderBottom: "1px solid #444", // Viền
            }}
          >
            {/* Nội dung công việc */}
            <span
              onClick={() => handleToggleTodo(todo._id)}
              style={{
                cursor: "pointer",
                fontSize: "18px",
                // Cập nhật màu chữ dựa trên trạng thái 'completed'
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "#888" : "#f5f5f5", // Chữ sáng / Chữ mờ
              }}
            >
              {todo.text}
            </span>

            {/* Nút Xóa */}
            <button
              onClick={() => handleDeleteTodo(todo._id)}
              style={{
                backgroundColor: "#dc3545", // Nút Xóa (màu đỏ sẫm)
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

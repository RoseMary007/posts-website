import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Dashboard() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    age: "",
  });
  const [editId, setEditId] = useState(null);

  // 🔒 Protect route + load posts
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
    } else {
      fetchPosts();
    }
  }, [navigate]);

  // 📥 Fetch posts
  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts/getPosts");
      setPosts(res.data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  // 🧠 Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ➕ Create / ✏️ Update
  const handleSubmit = async () => {
    try {
      if (!form.name || !form.description || !form.age) {
        return alert("All fields required");
      }

      if (editId) {
        await API.patch(`/posts/update/${editId}`, form);
        setEditId(null);
      } else {
        await API.post("/posts/create", form);
      }

      setForm({ name: "", description: "", age: "" });
      fetchPosts();
    } catch (err) {
      console.log("Submit error:", err);
    }
  };

  // ❌ Delete
  const handleDelete = async (id) => {
    try {
      await API.get(`/posts/delete/${id}`);
      fetchPosts();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  // ✏️ Edit
  const handleEdit = (post) => {
    setForm({
      name: post.name,
      description: post.description,
      age: post.age,
    });
    setEditId(post._id);
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="container">
      {/* HEADER */}
      <div className="header">
        <h2>Dashboard</h2>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* FORM */}
      <div className="section">
        <h3>{editId ? "Update Post" : "Create Post"}</h3>

        <input
          name="name"
          value={form.name}
          placeholder="Name"
          onChange={handleChange}
        />

        <input
          name="description"
          value={form.description}
          placeholder="Description"
          onChange={handleChange}
        />

        <input
          name="age"
          value={form.age}
          placeholder="Age"
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>
          {editId ? "Update Post" : "Create Post"}
        </button>
      </div>

      {/* POSTS */}
      <div className="section">
        <h3>All Posts</h3>

        {posts.length === 0 ? (
          <p>No posts found</p>
        ) : (
          <div className="posts">
            {posts.map((p) => (
              <div className="post-card" key={p._id}>
                <h4>{p.name}</h4>
                <p>{p.description}</p>
                <p>Age: {p.age}</p>

                <div className="actions">
                  <button onClick={() => handleEdit(p)}>Edit</button>
                  <button onClick={() => handleDelete(p._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
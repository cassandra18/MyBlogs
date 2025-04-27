import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ReactSelect from "react-select";
import { MultiValue, ActionMeta } from "react-select";

interface Category {
  _id: string;
  name: string;
}

interface Tag {
  _id: string;
  name: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  category: Category;
  tags: Tag[];
  imagePaths?: string[];
}

const ManagePosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: { _id: "", name: "" }, // Category now stores an object with _id and name
    tags: [] as { _id: string, name: string }[], // Store tags by name
    images: [] as File[],
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch posts, categories, and tags
  useEffect(() => {
    fetchPosts();
    fetchCategories();
    fetchTags();
  }, []);

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:3000/api/post");
    const fetchedPosts = Array.isArray(res.data) ? res.data : res.data.posts;
    setPosts(fetchedPosts || []);
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/categories");
      setCategories(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  const fetchTags = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/tags");
      setTags(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching tags:", error);
      setTags([]);
    }
  };

  // Handle input changes in the form
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "category") {
      // Find the selected category object from the categories array
      const selectedCategory = categories.find((cat) => cat._id === value);
      if (selectedCategory) {
        setForm((prev) => ({ ...prev, category: selectedCategory }));
      } else {
        // Handle the case where the selected value doesn't match any category (shouldn't happen in normal use)
        setForm((prev) => ({ ...prev, category: { _id: "", name: "" } }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle file changes (images)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setForm((prev) => ({ ...prev, images: Array.from(files) }));
    }
  };

  // Handle multiple tag selection
  const handleTagChange = (
    newValue: MultiValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    console.log("Action type:", actionMeta.action);
  
    if (actionMeta.action === "clear") {
      console.log("User cleared all selected tags!");
    }
  
    setForm((prev) => ({
      ...prev,
      tags: newValue.map((option) => {
        const selectedTag = tags.find((tag) => tag._id === option.value);
        return selectedTag ? { _id: selectedTag._id, name: selectedTag.name } : { _id: "", name: option.value };
      }),
    }));
  };
  

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("category", form.category._id);
    form.tags.forEach((tag) => {
      formData.append("tags[]", tag._id);
    });
    form.images.forEach((image) => {
      formData.append("images", image);
    });
  
    console.log("Form data being submitted:", formData);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please login again.");
      }
  
      // If editing an existing post
      if (editingPostId) {
        await axios.put(
          `http://localhost:3000/api/post/${editingPostId}`,
          formData, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-type": "multipart/form-data",
            },
          }
        );
        setEditingPostId(null);
      } else {
        // If creating a new post
        await axios.post("http://localhost:3000/api/post/", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "multipart/form-data",
          },
        });
      }
      // Reset form fields
      setForm({ title: "", content: "", category: { _id: "", name: "" }, tags: [], images: [] });
      fetchPosts(); // Refresh the posts list
      setShowForm(false); // Hide the form

      console.log("Form submitted successfully!", form);
      toast.success(
        editingPostId ? "Post updated successfully!" : "Post created successfully!",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // Handle post edit
  const handleEdit = (post: Post) => {
    setForm({
      title: post.title,
      content: post.content,
      category: post.category, // Set the full category object (with _id and name)
      tags: post.tags, // Set tags as an array of objects (with _id and name)
      images: [],
    });
    setEditingPostId(post._id);
    setShowForm(true);
  };

  // Handle post delete
  const handleDelete = async (id: string) => {
    await axios.delete(`http://localhost:3000/api/post/${id}`);
    fetchPosts();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-orange-500">Add Blog Post</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          {showForm ? "Cancel" : "Add New Post"}
        </button>
      </div>

      {showForm && (
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md mb-8 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <input
            type="text"
            name="title"
            placeholder="Post Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            name="content"
            placeholder="Post Content"
            value={form.content}
            onChange={handleChange}
            className="w-full border p-2 rounded h-32"
            required
          />
          <select
            name="category"
            value={form.category._id}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          <ReactSelect
            isMulti
            name="tags"
            options={tags.map((tag) => ({ value: tag._id, label: tag.name }))}
            value={form.tags.map((tag) => ({
              value: tag._id,
              label: tag.name,
            }))}
            onChange={handleTagChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="file"
            name="images"
            multiple
            onChange={handleImageChange}
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
          >
            {editingPostId ? "Update Post" : "Create Post"}
          </button>
        </motion.form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white p-6 rounded-lg shadow-md space-y-2"
          >
            <h2 className="text-2xl font-bold text-orange-700">{post.title}</h2>
            <p className="text-gray-600">{post.content.slice(0, 100)}...</p>
            <p className="text-sm text-gray-400">{post.category.name}</p>
            <div className=" mt-2">
              {post.tags.map((tag) => (
                <span
                  key={tag._id}
                  className="text-xs bg-orange-100 text-orange-700 px-2  py-1 rounded mr-2"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleEdit(post)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePosts;

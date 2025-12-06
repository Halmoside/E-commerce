

export async function fetchProducts() {
  const res = await fetch(`${https://e-commerce-9paa.onrender.com}/api/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProductById(id) {
  const res = await fetch(`${https://e-commerce-9paa.onrender.com}/api/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function registerUser(data) {
  const res = await fetch(`${https://e-commerce-9paa.onrender.com}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function loginUser(data) {
  const res = await fetch(`${https://e-commerce-9paa.onrender.com}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getCurrentUser(token) {
  const res = await fetch(`${https://e-commerce-9paa.onrender.com}/api/users/current`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}




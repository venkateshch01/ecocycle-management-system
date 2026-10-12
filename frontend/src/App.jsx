
import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:8080/api/waste";
const USERS_API_URL = "http://localhost:8080/api/users";
const REPORTS_API_URL = "http://localhost:8080/api/reports";
const RECOVERIES_API_URL = "http://localhost:8080/api/recoveries";
const COMPONENTS_API_URL = "http://localhost:8080/api/components";
const REQUESTS_API_URL = "http://localhost:8080/api/requests";
const SETTINGS_API_URL = "http://localhost:8080/api/settings";
const initialData = {
  waste: [
    { id: 1, item: "Old Laptop", category: "Laptop", quantity: 3, weight: 6, status: "Collected" },
    { id: 2, item: "Mobile Phones", category: "Mobile", quantity: 5, weight: 2, status: "Pending" },
  ],
  components: [
    { id: 1, name: "RAM", source: "Laptop", quantity: 8, condition: "Good" },
    { id: 2, name: "Hard Drive", source: "Desktop", quantity: 4, condition: "Reusable" },
  ],
  requests: [
    { id: 1, name: "Rahul Kumar", item: "Laptop", quantity: 2, status: "Pending" },
    { id: 2, name: "Priya Sharma", item: "Mobile", quantity: 3, status: "Collected" },
  ],
  users: [],
  reports: [],
  settings: [],
  recoveries: [],
};

const pages = [
  ["dashboard", "▦", "Dashboard"],
  ["waste", "♻", "E-Waste Items"],
  ["components", "⚙", "Components"],
  ["requests", "▤", "Collection Requests"],
  ["users", "👥", "Users"],
  ["reports", "📊", "Reports"],
  ["settings", "⚙", "Settings"],
  ["recoveries", "♻️", "Recoveries"],
];

const configs = {
  waste: {
    title: "E-Waste Items",
    fields: [
      ["item", "Item Name"],
      ["category", "Category"],
      ["quantity", "Quantity", "number"],
      ["weight", "Weight (kg)", "number"],
      ["status", "Status"],
    ],
  },
  components: {
    title: "Recovered Components",
    fields: [
      ["name", "Component Name"],
      ["source", "Source Device"],
      ["quantity", "Quantity", "number"],
      ["condition", "Condition"],
    ],
  },
requests: {
  title: "Collection Requests",
  fields: [
    ["name", "Requester Name"],
    ["item", "E-Waste Item"],
    ["quantity", "Quantity", "number"],
    ["status", "Status"],
  ],
},
users: {
  title: "Users",
  fields: [
    ["name", "Full Name"],
    ["email", "Email Address"],
    ["role", "Role"],
    ["phone", "Phone Number"],
  ],
},
reports: {
  title: "Reports",
  fields: [
    ["reportName", "Report Name"],
    ["date", "Report Date", "date"],
    ["status", "Status"],
  ],
},
settings: {
  title: "Settings",
  fields: [
    ["siteName", "System Name"],
    ["contactEmail", "Contact Email"],
  ],
},
recoveries: {
  title: "Recoveries",
  fields: [
    ["componentName", "Recovered Component"],
    ["quantity", "Quantity", "number"],
    ["condition", "Condition"],
    ["status", "Recovery Status"],
  ],

},
};


function App() {
const [data, setData] = useState(initialData);
const [apiUsers, setApiUsers] = useState([]);
const [apiReports, setApiReports] = useState([]);
const [apiRecoveries, setApiRecoveries] = useState([]);
const [apiComponents, setApiComponents] = useState([]);
const [apiRequests, setApiRequests] = useState([]);
const [apiSettings, setApiSettings] = useState([]);
async function loadUsers() {
  try {
    const response = await fetch(USERS_API_URL);

    if (!response.ok) {
      throw new Error("Failed to load users");
    }

    const users = await response.json();
    setApiUsers(users);
  } catch (error) {
    console.error("Error loading users:", error);
  }
}

async function loadReports() {
  try {
    const response = await fetch(REPORTS_API_URL);

    if (!response.ok) {
      throw new Error("Failed to load reports");
    }

    const reports = await response.json();
    setApiReports(reports);
  } catch (error) {
    console.error("Error loading reports:", error);
  }
}
async function loadRecoveries() {
  try {
    const response = await fetch(RECOVERIES_API_URL);

    if (!response.ok) {
      throw new Error("Failed to load recoveries");
    }

    const recoveries = await response.json();
    setApiRecoveries(recoveries);
  } catch (error) {
    console.error("Error loading recoveries:", error);
  }
}
async function loadComponents() {
  try {
    const response = await fetch(COMPONENTS_API_URL);

    if (!response.ok) {
      throw new Error("Failed to load components");
    }

    const components = await response.json();
    setApiComponents(components);
  } catch (error) {
    console.error("Error loading components:", error);
  }
}
async function loadRequests() {
  try {
    const response = await fetch(REQUESTS_API_URL);

    if (!response.ok) {
      throw new Error("Failed to load requests");
    }

    const requests = await response.json();
    setApiRequests(requests);
  } catch (error) {
    console.error("Error loading requests:", error);
  }
}
async function loadSettings() {
  try {
    const response = await fetch(SETTINGS_API_URL);

    if (!response.ok) {
      throw new Error("Failed to load settings");
    }

    const settings = await response.json();
    setApiSettings(settings);
  } catch (error) {
    console.error("Error loading settings:", error);
  }
}
useEffect(() => {
  loadUsers();
  loadReports();
  loadRecoveries();
  loadComponents();
  loadRequests();
  loadSettings();
}, []);

useEffect(() => {
  fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load waste items");
      }
      return response.json();
    })
    .then((items) => setApiWaste(items))
    .catch((error) => console.error("Backend error:", error));
}, []);
const [apiWaste, setApiWaste] = useState([]);
const [apiLoading, setApiLoading] = useState(false);

async function fetchWaste() {
  setApiLoading(true);

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Could not load waste records");
    }

    const records = await response.json();

    setApiWaste(records.map(item => ({
      id: item.id,
      item: item.itemName,
      category: item.category,
      quantity: item.quantity,
      weight: item.weight ?? 0,
      status: item.status,
    })));
  } catch (error) {
    console.error(error);
    notify("Could not connect to backend. Check that Spring Boot is running.");
  } finally {
    setApiLoading(false);
  }
}

useEffect(() => {
  fetchWaste();
}, []);

  const [page, setPage] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");

  
  const totalItems = apiWaste.reduce(
    (sum, item) => sum + Number(item.quantity || 0), 0
  );
  const totalComponents = apiComponents.reduce(
    (sum, item) => sum + Number(item.quantity || 0), 0
  );

  const pending = apiWaste.filter(
    (item) => item.status?.toLowerCase() === "pending"
  ).length;

  const totalWeight = apiWaste.reduce(
    (sum, item) => sum + Number(item.weight || 0), 0
  );

  function notify(text) {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2500);
  }

  function openForm(record = null) {
    const fields = configs[page].fields;
    const values = Object.fromEntries(
      fields.map(([key]) => [key, record?.[key] ?? ""])
    );
    setForm(values);
    setEditing(record ? record.id : "new");
  }

  function saveRecord(event) {
    event.preventDefault();
    if (page === "waste") {
  const payload = {
    itemName: form.item,
    category: form.category,
    quantity: Number(form.quantity),
    weight: Number(form.weight),
    conditionStatus: "Good",
    collectionAddress: "Not provided",
    status: form.status || "Pending",
  };
  console.log("Saving payload:", payload);
  const url = editing === "new" ? API_URL : `${API_URL}/${editing}`;

  fetch(url, {
    method: editing === "new" ? "POST" : "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Could not save waste item");
      return response.json();
    })
    .then(() => {
      setEditing(null);
      fetchWaste();
      notify("Waste item saved successfully!");
    })
    .catch((error) => {
      console.error(error);
      notify("Save failed. Check the browser console.");
    });

  return;
}  
    
if (page === "users") {
  const payload = {
    name: form.name,
    email: form.email,
    role: form.role,
    phone: form.phone,
  };

  const url = editing === "new"
    ? USERS_API_URL
    : `${USERS_API_URL}/${editing}`;

  fetch(url, {
    method: editing === "new" ? "POST" : "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Could not save user");
      return response.json();
    })
    .then(() => {
      setEditing(null);
      loadUsers();
      notify("User saved successfully!");
    })
    .catch((error) => {
      console.error(error);
      notify("User save failed. Check the browser console.");
    });

  return;
}

if (page === "reports") {
  const payload = {
    reportName: form.reportName,
    date: form.date,
    status: form.status,
  };

  const url = editing === "new"
    ? REPORTS_API_URL
    : `${REPORTS_API_URL}/${editing}`;

  fetch(url, {
    method: editing === "new" ? "POST" : "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not save report");
      }
      return response.json();
    })
    .then(() => {
      setEditing(null);
      loadReports();
      notify("Report saved successfully!");
    })
    .catch((error) => {
      console.error(error);
      notify("Report save failed. Check the browser console.");
    });

  return;
}
if (page === "recoveries") {
  const payload = {
    componentName: form.componentName,
    quantity: Number(form.quantity),
    condition: form.condition,
    status: form.status,
  };

  const url = editing === "new"
    ? RECOVERIES_API_URL
    : `${RECOVERIES_API_URL}/${editing}`;

  fetch(url, {
    method: editing === "new" ? "POST" : "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not save recovery");
      }
      return response.json();
    })
    .then(() => {
      setEditing(null);
      loadRecoveries();
      notify("Recovery saved successfully!");
    })
    .catch((error) => {
      console.error(error);
      notify("Recovery save failed. Check the browser console.");
    });

  return;
}
if (page === "components") {
  const payload = {
    name: form.name,
    source: form.source,
    quantity: Number(form.quantity),
    condition: form.condition,
  };

  const url = editing === "new"
    ? COMPONENTS_API_URL
    : `${COMPONENTS_API_URL}/${editing}`;

  fetch(url, {
    method: editing === "new" ? "POST" : "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not save component");
      }
      return response.json();
    })
    .then(() => {
      setEditing(null);
      loadComponents();
      notify("Component saved successfully!");
    })
    .catch((error) => {
      console.error(error);
      notify("Component save failed. Check the browser console.");
    });

  return;
}
if (page === "requests") {
  const payload = {
    name: form.name,
    item: form.item,
    quantity: Number(form.quantity),
    status: form.status,
  };

  const url = editing === "new"
    ? REQUESTS_API_URL
    : `${REQUESTS_API_URL}/${editing}`;

  fetch(url, {
    method: editing === "new" ? "POST" : "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not save request");
      }
      return response.json();
    })
    .then(() => {
      setEditing(null);
      loadRequests();
      notify("Request saved successfully!");
    })
    .catch((error) => {
      console.error(error);
      notify("Request save failed. Check the browser console.");
    });

  return;
}
if (page === "settings") {
  const payload = {
    siteName: form.siteName,
    contactEmail: form.contactEmail,
  };

  const url = editing === "new"
    ? SETTINGS_API_URL
    : `${SETTINGS_API_URL}/${editing}`;

  fetch(url, {
    method: editing === "new" ? "POST" : "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not save settings");
      }
      return response.json();
    })
    .then(() => {
      setEditing(null);
      loadSettings();
      notify("Settings saved successfully!");
    })
    .catch((error) => {
      console.error(error);
      notify("Settings save failed. Check the browser console.");
    });

  return;
}
    const fields = configs[page].fields;
    const record = { ...form };

    fields.forEach(([key, , type]) => {
      if (type === "number") record[key] = Number(record[key]) || 0;
    });

    setData(previous => ({
      ...previous,
      [page]: editing === "new"
        ? [{ ...record, id: Date.now() }, ...previous[page]]
        : previous[page].map(item =>
            item.id === editing ? { ...item, ...record } : item
          ),
    }));

    setEditing(null);
    notify(editing === "new" ? "Record added successfully!" : "Record updated!");
  }

  
function deleteRecord(id) {
  if (!window.confirm("Delete this record?")) return;

  if (page === "waste") {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not delete waste item");
        }
        fetchWaste();
        notify("Record deleted successfully!");
      })
      .catch((error) => {
        console.error("Delete failed:", error);
        notify("Delete failed. Please try again.");
      });

    return;
  }
  if (page === "users") {
  fetch(`${USERS_API_URL}/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not delete user");
      }

      loadUsers();
      notify("User deleted successfully!");
    })
    .catch((error) => {
      console.error("Delete failed:", error);
      notify("User deletion failed. Please try again.");
    });

  return;
}
  
if (page === "reports") {
  fetch(`${REPORTS_API_URL}/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not delete report");
      }
      loadReports();
      notify("Report deleted successfully!");
    })
    .catch((error) => {
      console.error("Delete failed:", error);
      notify("Report deletion failed. Please try again.");
    });

  return;
}
if (page === "recoveries") {
  fetch(`${RECOVERIES_API_URL}/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not delete recovery");
      }

      loadRecoveries();
      notify("Recovery deleted successfully!");
    })
    .catch((error) => {
      console.error("Delete failed:", error);
      notify("Recovery deletion failed. Please try again.");
    });

  return;
}

if (page === "components") {
  fetch(`${COMPONENTS_API_URL}/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not delete component");
      }

      loadComponents();
      notify("Component deleted successfully!");
    })
    .catch((error) => {
      console.error("Delete failed:", error);
      notify("Component deletion failed. Please try again.");
    });

  return;
}
if (page === "requests") {
  fetch(`${REQUESTS_API_URL}/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not delete request");
      }

      loadRequests();
      notify("Request deleted successfully!");
    })
    .catch((error) => {
      console.error("Delete failed:", error);
      notify("Request deletion failed. Please try again.");
    });

  return;
}
if (page === "settings") {
  fetch(`${SETTINGS_API_URL}/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not delete setting");
      }

      loadSettings();
      notify("Setting deleted successfully!");
    })
    .catch((error) => {
      console.error("Delete failed:", error);
      notify("Setting deletion failed. Please try again.");
    });

  return;
}
  setData((previous) => ({
    ...previous,
    [page]: previous[page].filter((item) => item.id !== id),
  }));

  notify("Record deleted successfully!");
}


  function openPage(id) {
    setPage(id);
    setSearch("");
    setEditing(null);
  }

  function statusClass(status) {
    return String(status || "Available").toLowerCase().replace(/\s+/g, "-");
  }




const records = configs[page]
  ? (page === "waste"
      ? apiWaste
      : page === "users"
        ? apiUsers
        : page === "reports"
  ? apiReports
  : page === "recoveries"
  ? apiRecoveries
  : page === "components"
  ? apiComponents
  : page === "requests"
  ? apiRequests
  : page === "settings"
    ? apiSettings
    : []
    ).filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    )
  : [];



  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">♻</span>
          <div>
            <h2>EcoCycle</h2>
            <p>Management System</p>
          </div>
        </div>

        <p className="nav-heading">MAIN MENU</p>
        {pages.map(([id, icon, label]) => (
          <button
            key={id}
            className={`nav-link ${page === id ? "selected" : ""}`}
            onClick={() => openPage(id)}
          >
            <span>{icon}</span>{label}
            {id === "requests" && pending > 0 && (
              <small>{pending}</small>
            )}
          </button>
        ))}

        <div className="eco-note">
          <span>🌱</span>
          <h3>Recycle Today</h3>
          <p>Restore Tomorrow. Give electronics a second life.</p>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h1>E-Waste Collection & Recovery</h1>
            <p>Recycle Today | Restore Tomorrow</p>
          </div>
          <div className="admin">● <span>Administrator</span></div>
        </header>

        <section className="content">
          {page === "dashboard" ? (
            <>
              <div className="welcome">
                <div>
                  <h2>Welcome back, Admin! 👋</h2>
                  <p>Here's your e-waste management overview.</p>
                </div>
                <button className="primary" onClick={() => openPage("waste")}>
                  + Manage E-Waste
                </button>
              </div>

              <div className="stats">
  <Stat icon="♻️" label="Total Waste Collected" value={apiWaste.length} color="green" />
  <Stat icon="⚖️" label="Total Weight" value={`${totalWeight} kg (${(totalWeight * 1000).toFixed(0)} g)`} color="blue" />
  <Stat icon="📦" label="Pending Pickups" value={pending} color="orange" />
  <Stat icon="✅" label="Completed Collections" value={apiWaste.filter((item) => item.status?.toLowerCase() === "completed").length} color="purple" />
</div>
              <div className="stats extra-stats">
                <Stat icon="⚖️" label="Total E-Waste Weight" value={`${totalWeight} kg (${(totalWeight * 1000).toFixed(0)} g)`} color="green" />
                <Stat icon="🧰" label="Recovery Records" value={apiComponents.length} color="purple" />
              </div>

              <div className="panels">
                <section className="panel">
                  <div className="panel-heading">
                    <div><h3>Recent E-Waste Items</h3><p>Latest collection records</p></div>
                    <button className="text-button" onClick={() => openPage("waste")}>View all →</button>
                  </div>
                  {apiWaste.slice(0, 5).map(item => (
                    <div className="recent-row" key={item.id}>
                      <span className="row-icon">♻</span>
                      <div className="row-info"><strong>{item.itemName}</strong><p>{item.category}</p></div>
                      <span className={`status ${statusClass(item.status)}`}>{item.status}</span>
                    </div>
                  ))}
                  {apiWaste.length === 0 && <p className="empty">No collection records yet.</p>}
                </section>

                <section className="panel">
                  <div className="panel-heading">
                    <div><h3>Recovered Components</h3><p>Reusable electronic parts</p></div>
                    <button className="text-button" onClick={() => openPage("components")}>View all →</button>
                  </div>
                  {apiComponents.slice(0, 5).map(item => (
                    <div className="recent-row" key={item.id}>
                      <span className="row-icon purple-bg">⚙</span>
                      <div className="row-info"><strong>{item.name}</strong><p>Source: {item.source}</p></div>
                      <span className="quantity">{item.quantity} units</span>
                    </div>
                  ))}
                  {apiComponents.length === 0 && <p className="empty">No components recovered yet.</p>}
                </section>
              </div>

              <section className="panel request-panel">
                <div className="panel-heading">
                  <div><h3>Recent Collection Requests</h3><p>Pickup request status</p></div>
                  <button className="text-button" onClick={() => openPage("requests")}>View all →</button>
                </div>
                <div className="table-wrap">
                  <table>
                    <thead><tr><th>Requester</th><th>Item</th><th>Quantity</th><th>Status</th></tr></thead>
                    <tbody>
                      {apiRequests.slice(0, 5).map(item => (
                        <tr key={item.id}>
                          <td>{item.name}</td><td>{item.item}</td><td>{item.quantity}</td>
                          <td><span className={`status ${statusClass(item.status)}`}>{item.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {apiRequests.length === 0 && <p className="empty">No collection requests yet.</p>}
                </div>
              </section>
            </>
          ) : (
            <>
              <div className="welcome">
                <div>
                  <h2>{configs[page].title}</h2>
                  <p>Create, view, edit, and delete your records.</p>
                </div>
                <button className="primary" onClick={() => openForm()}>
                  + Add Record
                </button>
              </div>

              <div className="toolbar">
                <input
                  value={search}
                  onChange={event => setSearch(event.target.value)}
                  placeholder="Search records..."
                />
                <span>{records.length} record(s)</span>
              </div>

              <section className="panel table-panel">
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        {configs[page].fields.map(([key, label]) => <th key={key}>{label}</th>)}
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map(record => (
                        <tr key={record.id}>
                          <td>#{String(record.id).slice(-5)}</td>
                          {configs[page].fields.map(([key]) => (
                            <td key={key}>
                              {key === "status" || key === "condition"
                                ? <span className={`status ${statusClass(record[key])}`}>{record[key] || "Available"}</span>
                                : record[key]}
                            </td>
                          ))}
                          <td>
                            <div className="actions">
                              <button className="edit" onClick={() => openForm(record)} title="Edit">✎</button>
                              <button className="delete" onClick={() => deleteRecord(record.id)} title="Delete">×</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {records.length === 0 && <p className="empty">No records found. Click Add Record to begin.</p>}
                </div>
              </section>
              <p className="storage-note">●Your records are stored in the backend database.</p>
            </>
          )}
        </section>

        <footer>© 2026 EcoCycle Management System <span>Reduce · Reuse · Recover</span></footer>
      </main>

      {editing !== null && configs[page] && (
        <div className="overlay" onMouseDown={event => {
          if (event.target === event.currentTarget) setEditing(null);
        }}>
          <form className="modal" onSubmit={saveRecord}>
            <div className="modal-title">
              <div>
                <p>RECORD MANAGEMENT</p>
                <h2>{editing === "new" ? "Add New Record" : "Edit Record"}</h2>
              </div>
              <button type="button" className="close" onClick={() => setEditing(null)}>×</button>
            </div>

            <div className="form-grid">
              {configs[page].fields.map(([key, label, type]) => (
                <label key={key}>
                  <span>{label} *</span>
                  {key === "status" ? (
                    <select required value={form[key] ?? ""} onChange={event => setForm({ ...form, [key]: event.target.value })}>
                      {["Pending", "Collected", "Processing", "Completed"].map(option => <option key={option}>{option}</option>)}
                    </select>
                  ) : key === "condition" ? (
                    <select required value={form[key] ?? ""} onChange={event => setForm({ ...form, [key]: event.target.value })}>
                      {["Good", "Reusable", "Damaged", "For Recycling"].map(option => <option key={option}>{option}</option>)}
                    </select>
                  ) : (
                    <input
                      required
                      type={key === "weight" ? "number" : type || "text"}
step={key === "weight" ? "any" : "1"}
                      min={type === "number" && key === "quantity" ? 1 : type === "number" ? 0 : undefined}
                      value={form[key] ?? ""}
                      onChange={event => setForm({ ...form, [key]: event.target.value })}
                      placeholder={`Enter ${label.toLowerCase()}`}
                    />
                  )}
                </label>
              ))}
            </div>

            <div className="modal-actions">
              <button type="button" className="secondary" onClick={() => setEditing(null)}>Cancel</button>
              <button type="submit" className="primary">{editing === "new" ? "Save Record" : "Update Record"}</button>
            </div>
          </form>
        </div>
      )}

      {message && <div className="toast">✓ {message}</div>}
    </div>
  );
}

function Stat({ icon, label, value, color }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${color}`}>{icon}</div>
      <p>{label}</p>
      <h2>{value}</h2>
      <span>Current records overview</span>
    </article>
  );
}

export default App;

import { useState } from "react";

export default function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    "Customer: Where is my Shopify order?",
    "AI: Order #SH-1024 is currently processing.",
    "Agent: Tracking details will be updated soon.",
  ]);

  const menu = [
    ["Dashboard", "🏠"],
    ["Orders", "🛒"],
    ["Tickets", "🎫"],
    ["Customers", "👥"],
    ["Refunds", "💸"],
    ["Live Chat", "💬"],
    ["Analytics", "📊"],
    ["AI Replies", "🤖"],
    ["Settings", "⚙️"],
  ];

  const cards = [
    ["Total Orders", "1,284", "+18%", "🛒", "#22c55e"],
    ["Open Tickets", "72", "+9%", "🎫", "#38bdf8"],
    ["Refunds", "18", "-4%", "💸", "#fb7185"],
    ["Revenue", "$24,580", "+22%", "📈", "#facc15"],
  ];

  const orders = [
    ["#SH-1024", "Rahul Kumar", "Wireless Earbuds", "Paid", "$120"],
    ["#SH-1025", "Sarah Smith", "Smart Watch", "Pending", "$89"],
    ["#SH-1026", "Amit Raj", "Phone Case", "Refund", "$45"],
    ["#SH-1027", "John Carter", "Running Shoes", "Shipped", "$150"],
  ];

  const tickets = [
    ["Payment issue", "Open"],
    ["Refund request", "Open"],
    ["Shipping delay", "Pending"],
    ["Order tracking", "Resolved"],
  ];

  const customers = [
    ["Rahul Kumar", "rahul@example.com", "4 Orders"],
    ["Sarah Smith", "sarah@example.com", "2 Orders"],
    ["Amit Raj", "amit@example.com", "6 Orders"],
    ["John Carter", "john@example.com", "3 Orders"],
  ];

  const refunds = [
    ["#RF-201", "Amit Raj", "$45", "Review"],
    ["#RF-202", "Sarah Smith", "$89", "Pending"],
    ["#RF-203", "Rahul Kumar", "$120", "Approved"],
  ];

  const aiReplies = [
    "Please share your order ID.",
    "Your refund request has been received.",
    "Your order is currently out for delivery.",
    "We are checking your payment status.",
  ];

  const statusColor = (status) => {
    if (["Paid", "Approved", "Resolved"].includes(status)) return "#22c55e";
    if (["Pending", "Review"].includes(status)) return "#f59e0b";
    if (["Refund", "Open"].includes(status)) return "#ef4444";
    if (status === "Shipped") return "#38bdf8";
    return "#64748b";
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    setChatMessages([...chatMessages, `Agent: ${message}`]);
    setMessage("");
  };

  return (
    <div style={styles.app}>
      <aside style={styles.sidebar}>
        <h1 style={styles.logo}>🛍️ Shopify CRM</h1>
        <p style={styles.logoText}>Customer Support Dashboard</p>

        {menu.map(([name, icon]) => (
          <button
            key={name}
            onClick={() => setActivePage(name)}
            style={{
              ...styles.navBtn,
              background: activePage === name ? "rgba(255,255,255,0.22)" : "transparent",
              border: activePage === name ? "1px solid rgba(255,255,255,0.55)" : "1px solid transparent",
            }}
          >
            <span>{icon}</span>
            <span>{name}</span>
          </button>
        ))}
      </aside>

      <main style={styles.main}>
        <div style={styles.topbar}>
          <div>
            <h1 style={styles.heading}>{activePage}</h1>
            <p style={styles.subHeading}>Orders, tickets, refunds, live chat and AI replies in one dashboard.</p>
          </div>

          <div style={styles.topRight}>
            <input style={styles.search} placeholder="Search..." />
            <div style={styles.iconBtn}>🔔</div>
            <div style={styles.avatar}>S</div>
          </div>
        </div>

        {activePage === "Dashboard" && (
          <>
            <section style={styles.cards}>
              {cards.map(([title, value, growth, icon, color]) => (
                <div key={title} style={{ ...styles.card, borderTop: `4px solid ${color}` }}>
                  <div style={styles.cardIcon}>{icon}</div>
                  <h3>{title}</h3>
                  <h1>{value}</h1>
                  <p style={{ color: growth.includes("-") ? "#fca5a5" : "#a3e635" }}>{growth} this month</p>
                </div>
              ))}
            </section>

            <section style={styles.grid}>
              <div style={styles.panel}>
                <h2>🧾 Recent Orders</h2>
                {orders.slice(0, 3).map((o) => (
                  <div style={styles.row} key={o[0]}>
                    <span>{o[0]}</span><span>{o[1]}</span><span>{o[2]}</span>
                    <b style={{ color: statusColor(o[3]) }}>{o[3]}</b><span>{o[4]}</span>
                  </div>
                ))}
              </div>

              <div style={styles.panel}>
                <h2>🎫 Tickets</h2>
                {tickets.map((t) => (
                  <div style={styles.ticket} key={t[0]}>
                    <span>{t[0]}</span><b style={{ color: statusColor(t[1]) }}>{t[1]}</b>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {activePage === "Orders" && (
          <div style={styles.panel}>
            <div style={styles.sectionTop}>
              <h2>🧾 Shopify Orders</h2>
              <button style={styles.greenBtn}>Export Orders</button>
            </div>

            <div style={styles.tableHeader}>
              <span>Order ID</span><span>Customer</span><span>Product</span><span>Status</span><span>Total</span>
            </div>

            {orders.map((o) => (
              <div style={styles.orderCard} key={o[0]}>
                <span>{o[0]}</span>
                <div style={styles.customerBox}><div style={styles.customerAvatar}>{o[1][0]}</div><span>{o[1]}</span></div>
                <span>{o[2]}</span>
                <span style={{ ...styles.badge, background: statusColor(o[3]) }}>{o[3]}</span>
                <b>{o[4]}</b>
              </div>
            ))}
          </div>
        )}

        {activePage === "Tickets" && (
          <div style={styles.panel}>
            <h2>🎫 Ticket Management</h2>
            {tickets.map((t) => (
              <div style={styles.ticket} key={t[0]}>
                <span>{t[0]}</span><b style={{ color: statusColor(t[1]) }}>{t[1]}</b>
              </div>
            ))}
          </div>
        )}

        {activePage === "Customers" && (
          <div style={styles.panel}>
            <h2>👥 Customers</h2>
            {customers.map((c) => (
              <div style={styles.customerCard} key={c[1]}>
                <div style={styles.customerBox}>
                  <div style={styles.customerAvatar}>{c[0][0]}</div>
                  <div><b>{c[0]}</b><p style={styles.smallText}>{c[1]}</p></div>
                </div>
                <b>{c[2]}</b>
              </div>
            ))}
          </div>
        )}

        {activePage === "Refunds" && (
          <div style={styles.panel}>
            <h2>💸 Refund Requests</h2>
            {refunds.map((r) => (
              <div style={styles.orderCard} key={r[0]}>
                <span>{r[0]}</span><span>{r[1]}</span><span>{r[2]}</span>
                <span style={{ ...styles.badge, background: statusColor(r[3]) }}>{r[3]}</span><b>Action</b>
              </div>
            ))}
          </div>
        )}

        {activePage === "Live Chat" && (
          <div style={styles.chatPanel}>
            <h2>💬 Live Customer Chat</h2>
            {chatMessages.map((msg, i) => (
              <div key={i} style={{
                ...styles.message,
                background: msg.startsWith("Agent") ? "#22c55e" : msg.startsWith("AI") ? "#38bdf8" : "#475569",
              }}>
                {msg}
              </div>
            ))}

            <div style={styles.chatInputBox}>
              <input
                style={styles.chatInput}
                value={message}
                placeholder="Type your reply..."
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button style={styles.greenBtn} onClick={sendMessage}>Send</button>
            </div>
          </div>
        )}

        {activePage === "Analytics" && (
          <div style={styles.panel}>
            <h2>📊 Shopify Analytics</h2>
            <div style={styles.analytics}>
              {[45, 75, 55, 90, 70, 100, 80].map((h, i) => (
                <div key={i} style={styles.barWrap}>
                  <div style={{ ...styles.bar, height: `${h}%` }}></div>
                  <span>D{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activePage === "AI Replies" && (
          <div style={styles.panel}>
            <h2>🤖 AI Smart Replies</h2>
            {aiReplies.map((reply) => (
              <div style={styles.ticket} key={reply}>
                <span>{reply}</span><button style={styles.useBtn}>Use</button>
              </div>
            ))}
          </div>
        )}

        {activePage === "Settings" && (
          <div style={styles.panel}>
            <h2>⚙️ Settings</h2>
            <p style={styles.smallText}>Manage dashboard preferences and account settings.</p>
            <button style={styles.logout}>Logout</button>
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    display: "flex",
    background: "#0f172a",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
  },
  sidebar: {
    width: "265px",
    background: "linear-gradient(180deg,#16a34a,#0ea5e9,#1d4ed8)",
    padding: "24px 18px",
    boxSizing: "border-box",
  },
  logo: { fontSize: "25px", margin: 0 },
  logoText: { color: "#e0f2fe", fontSize: "13px", marginBottom: "22px" },
  navBtn: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "13px",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "700",
    textAlign: "left",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "8px",
  },
  main: { flex: 1, padding: "28px", overflowY: "auto" },
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    gap: "18px",
  },
  heading: { fontSize: "34px", margin: 0, lineHeight: "38px" },
  subHeading: { color: "#cbd5e1", marginTop: "6px", fontSize: "15px" },
  topRight: { display: "flex", alignItems: "center", gap: "10px" },
  search: {
    width: "285px",
    padding: "12px",
    borderRadius: "13px",
    border: "1px solid #475569",
    background: "#1e293b",
    color: "#fff",
  },
  iconBtn: {
    width: "44px",
    height: "44px",
    borderRadius: "13px",
    background: "#1e293b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "#22c55e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "16px",
    marginBottom: "18px",
  },
  card: {
    background: "#1e293b",
    borderRadius: "18px",
    padding: "18px",
    textAlign: "center",
    minHeight: "150px",
    boxShadow: "0 16px 35px rgba(0,0,0,0.25)",
  },
  cardIcon: { fontSize: "30px" },
  grid: { display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px" },
  panel: {
    background: "#1e293b",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 16px 35px rgba(0,0,0,0.25)",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1.3fr 1.4fr 1fr 1fr",
    gap: "8px",
    background: "#334155",
    padding: "12px",
    borderRadius: "13px",
    marginTop: "10px",
    alignItems: "center",
    fontSize: "14px",
  },
  ticket: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#334155",
    padding: "12px",
    borderRadius: "13px",
    marginTop: "10px",
  },
  sectionTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" },
  greenBtn: {
    padding: "11px 16px",
    border: "none",
    borderRadius: "12px",
    background: "#22c55e",
    color: "#fff",
    fontWeight: "800",
    cursor: "pointer",
  },
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "1fr 1.5fr 1.5fr 1fr 1fr",
    padding: "13px",
    background: "#0f172a",
    borderRadius: "13px",
    fontWeight: "800",
    marginBottom: "10px",
  },
  orderCard: {
    display: "grid",
    gridTemplateColumns: "1fr 1.5fr 1.5fr 1fr 1fr",
    alignItems: "center",
    padding: "13px",
    background: "#334155",
    borderRadius: "14px",
    marginBottom: "10px",
    gap: "8px",
  },
  customerBox: { display: "flex", alignItems: "center", gap: "9px" },
  customerAvatar: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "#22c55e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
  },
  customerCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#334155",
    padding: "13px",
    borderRadius: "14px",
    marginTop: "10px",
  },
  badge: {
    padding: "7px 12px",
    borderRadius: "999px",
    color: "#fff",
    fontWeight: "800",
    width: "fit-content",
  },
  smallText: { color: "#cbd5e1", margin: "4px 0" },
  chatPanel: {
    background: "#1e293b",
    borderRadius: "20px",
    padding: "20px",
    maxWidth: "900px",
  },
  message: {
    padding: "13px",
    borderRadius: "13px",
    marginTop: "10px",
    fontWeight: "700",
  },
  chatInputBox: { display: "flex", gap: "10px", marginTop: "14px" },
  chatInput: {
    flex: 1,
    padding: "13px",
    borderRadius: "12px",
    border: "none",
    background: "#0f172a",
    color: "#fff",
  },
  analytics: {
    height: "270px",
    display: "flex",
    alignItems: "end",
    gap: "22px",
    marginTop: "22px",
  },
  barWrap: {
    height: "220px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "end",
    alignItems: "center",
    gap: "8px",
  },
  bar: {
    width: "45px",
    background: "linear-gradient(180deg,#22c55e,#38bdf8)",
    borderRadius: "12px 12px 0 0",
  },
  useBtn: {
    padding: "7px 13px",
    border: "none",
    borderRadius: "10px",
    background: "#38bdf8",
    color: "#fff",
    fontWeight: "800",
  },
  logout: {
    width: "100%",
    padding: "14px",
    background: "#ef4444",
    border: "none",
    borderRadius: "13px",
    color: "#fff",
    fontWeight: "800",
    cursor: "pointer",
    marginTop: "18px",
  },
};
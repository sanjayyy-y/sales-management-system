export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">S</div>
        <div className="sidebar-title">
          <div className="sidebar-app-name">STech</div>
          <div className="sidebar-user-name">Sanjay Sahu</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section">
          <div className="sidebar-section-title">Main</div>
          <button className="sidebar-link sidebar-link-active">Dashboard</button>
          <button className="sidebar-link">Nexus</button>
          <button className="sidebar-link">Intake</button>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-title">Services</div>
          <button className="sidebar-link">Pre-active</button>
          <button className="sidebar-link">Active</button>
          <button className="sidebar-link">Blocked</button>
          <button className="sidebar-link">Closed</button>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-title">Invoices</div>
          <button className="sidebar-link">Proforma Invoices</button>
          <button className="sidebar-link">Final Invoices</button>
        </div>
      </nav>
    </aside>
  );
}
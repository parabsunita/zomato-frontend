import { useState } from "react";

const Panel = () => {
  const [firstName, setFirstName] = useState("");
  const handleSignOut = () => {
    // Implement your sign-out logic here
    // You can clear user authentication and reset any necessary state

    setFirstName("");
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        {/* Include your navbar components */}
        <div className="welcome">Welcome, {firstName}!</div>
        <button className="sign-out-button" onClick={handleSignOut}>
          Sign Out
        </button>
      </nav>
      <div className="container">
        <aside className="sidebar">
          {/* Include your sidebar components */}
          <ul>
            <li>Dashboard</li>
            <li>Orders</li>
            <li>Customers</li>
            {/* ... */}
          </ul>
        </aside>
        <main className="main-content ">
          {/* Include your main content components */}
          <h1>Dashboard</h1>
          <p>Content goes here...</p>
        </main>
      </div>
      <footer className="footer">
        {/* Include your footer components */}
        <p>Footer content</p>
      </footer>
    </div>
  );
};
export default Panel;

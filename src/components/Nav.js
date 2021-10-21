const Nav = ({ tracklistStatus, setTracklistStatus }) => {
  return (
    <nav className="nav">
      <img alt="logo" src={"./pcct.png"}></img>
      <div className="menu-items">
        <div className="menu-item">tracks</div>
        <div className="menu-item">gallery</div>
      </div>

      {/* <h1>tracks</h1> */}
    </nav>
  );
};

export default Nav;

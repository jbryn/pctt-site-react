const Nav = ({ tracklistStatus, setTracklistStatus }) => {
  return (
    <nav className="nav">
      <div className="logo">
        {/* <Image alt="pctt" src="/pctt_logo.png" layout="fill" /> */}
      </div>
      <div className="menu">
        <h1
          onClick={() => {
            setTracklistStatus(!tracklistStatus);
            console.log(tracklistStatus);
          }}
        >
          tracks
        </h1>
      </div>
    </nav>
  );
};

export default Nav;

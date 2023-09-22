import loadergif from './assets/Loading_icon.gif';
function Loader() {
  return (
    <div>
      <img
        src={loadergif}
        alt="loader"
        style={{
          margin: 'auto',
          textAlign: 'center',
        }}
      />
    </div>
  );
}

export default Loader;

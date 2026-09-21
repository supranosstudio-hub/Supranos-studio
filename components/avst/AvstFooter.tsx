export default function AvstFooter() {
  return (
    <footer className="ft night">
      <div className="wrap">
        <div className="ft-in">
          <div className="ft-col">
            <p className="ft-mark">
              Aa Vesavi
              <br />Selavulu Tarvata
            </p>
            <p className="meta">Days after my last summer holidays</p>
          </div>
          <div className="ft-col">
            <h4>Season One</h4>
            <ul>
              <li>
                <a href="#home">All thirteen episodes</a>
              </li>
              <li>
                <a href="#read">Read Episode One</a>
              </li>
              <li>
                <a href="#cast">Cast &amp; model sheets</a>
              </li>
              <li>
                <a href="#places-flat">Environment plates</a>
              </li>
              <li>
                <a href="#dna-built">How it is built</a>
              </li>
            </ul>
          </div>
          <div className="ft-col">
            <h4>Made by</h4>
            <ul>
              <li>
                Written &amp; directed by
                <br />Supranos
              </li>
              <li>
                <a href="https://bhargavkattunga.in" target="_blank" rel="noopener">
                  Supranos
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="ft-base">
          <span className="meta">© <span>{new Date().getFullYear()}</span> — All artwork and scripts</span>
          <span className="meta">Hyderabad · Forty days</span>
        </div>
      </div>
    </footer>
  );
}

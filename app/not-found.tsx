import Link from "next/link";
export default function NotFound() { return <main className="section"><div className="container narrow"><p className="eyebrow">404</p><h1>Page not found</h1><p className="section-lead">The page you requested does not exist or may have moved.</p><Link className="btn btn-primary" href="/">Back to home</Link></div></main>; }

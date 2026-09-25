"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="section"><div className="container narrow"><p className="eyebrow">SORRY</p><h1>Something went wrong.</h1><p className="section-lead">Please try again. If the problem continues, contact us directly.</p><button className="btn btn-primary" onClick={() => reset()}>Try again</button></div></main>;
}

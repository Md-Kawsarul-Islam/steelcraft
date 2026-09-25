import Image from "next/image";

const gallery = [
  ["01.jpg", "Ornamental Gate", "Gates"],
  ["02.jpg", "Decorative Steel Door", "Doors"],
  ["03.jpg", "CNC Pattern Screen", "CNC"],
  ["04.jpg", "Custom Steel Gate", "Gates"],
  ["05.jpg", "Fabricated Steel Tray", "Metal Works"],
  ["06.jpg", "Sports Goal Frame", "Metal Works"],
  ["07.jpg", "Steel Door Hardware", "Doors"],
  ["08.jpg", "Steel Roof Structure", "Structural Steel"],
  ["09.jpg", "Decorative Double Door", "Doors"],
  ["10.jpg", "Safety Barrier & Frame", "Metal Works"],
  ["11.jpg", "Ventilation / Louver Panel", "CNC"],
  ["12.jpg", "Steel Service Door", "Doors"],
  ["13.jpg", "Roof Truss Structure", "Structural Steel"],
  ["14.jpg", "Decorative Stair Railing", "Railings"],
  ["15.jpg", "On-Site Steel Framework", "Structural Steel"],
  ["16.jpg", "Corrugated Steel Fence", "Fencing"],
  ["17.jpg", "Commercial Steel Racking", "Commercial"],
  ["18.jpg", "Steel Stair Structure", "Structural Steel"],
  ["19.jpg", "Safety Access Ladder", "Metal Works"],
] as const;

export default function WorkGallery() {
  return (
    <section
      className="section work-gallery-section"
      aria-labelledby="work-gallery-title"
    >
      <div className="container">
        <div className="gallery-heading">
          <div>
            <p className="eyebrow">CRAFTED ON SITE</p>

            <h2 id="work-gallery-title">Our recent work</h2>

            <p className="section-lead">
              Real fabrication, installation and finishing work from our
              workshop and project sites.
            </p>
          </div>

          <span className="gallery-count">
            {gallery.length} project photos
          </span>
        </div>

        <div className="work-gallery">
          {gallery.map(([file, title, category], index) => (
            <figure
              className={`work-gallery-item gallery-item-${(index % 5) + 1}`}
              key={file}
            >
              {/* Fixed image ratio */}
              <div className="work-gallery-media aspect-[4/3] relative overflow-hidden rounded-2xl">
                <Image
                  src={`/images/work/${file}`}
                  alt={title}
                  fill
                  priority={index < 3}
                  sizes="
                    (max-width: 600px) 92vw,
                    (max-width: 900px) 46vw,
                    31vw
                  "
                  className="object-cover transition-transform duration-500 ease-out hover:scale-105"
                />

                <div className="work-gallery-overlay">
                  <span>{category}</span>
                  <strong>{title}</strong>
                </div>
              </div>

              <figcaption>{title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
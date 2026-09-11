// Fondo mesh-gradient animado en CSS puro (sin WebGL, sin dependencias).
// Nebulosa del espectro que deriva lentamente — atmósfera viva y robusta.
export default function MeshGradient() {
  return (
    <div className="mesh-bg" aria-hidden="true">
      <span className="mesh-b1" />
      <span className="mesh-b2" />
      <span className="mesh-b3" />
      <span className="mesh-b4" />
    </div>
  );
}

export default function GrainOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 opacity-10 mix-blend-multiply">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08)_0,transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06)_0,transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0,transparent_38px,rgba(26,24,20,0.025)_38px,rgba(26,24,20,0.025)_39px)]" />
    </div>
  );
}

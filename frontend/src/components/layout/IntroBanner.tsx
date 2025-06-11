export default function IntroBanner() {
  return (
    <div className="w-full h-auto px-20 py-5 bg-center grid grid-cols-1 md:grid-cols-10 items-center">
      <div className="w-full text-5xl text-foreground font-bold text-left md:col-span-6">
        LocaDescriber
      </div>
      <div className="w-full text-md text-foreground font-semibold md:text-right text-left md:col-span-4">
        An Ontology-Based Approach to Enhancing Location Descriptions for Multi-Dimensional Features
      </div>
    </div>
  );
}
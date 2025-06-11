export default function ReverseGeocoding() {
  const sections = [
    {
      title: "Mutli-Dimensional Input",
      content: "including points, lines and polygons.",
      image: "/images/input.svg",
    },
    {
      title: "Semantical Location Descritpion Output",
      content: "including absoluton and relative location description.",
      image: "/images/output.svg",
    },
  ];

  return (
    <div className="mx-auto h-auto px-4 py-10 text-foreground">
      <h2 className="text-3xl md:text-4xl font-bold text-left p-10 tracking-tight">Get to Know LocaDescriber</h2>
      <div className="flex flex-row gap-6">
        {/* 左側卡片 */}
        <div className="w-1/2 h-100 bg-card rounded-md shadow-xl/10 p-8 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">{sections[0].title}</h2>
          <div className="mb-10">{sections[0].content}</div>
          {sections[0].image && (
            <div className="w-full aspect-[4/3] overflow-hidden flex items-center justify-center rounded-lg">
              <img
                src={sections[0].image}
                alt=""
                className="w-auto h-full object-cover"
              />
            </div>
          )}
        </div>
        {/* 右側卡片 */}
        <div className="w-1/2 h-100 bg-card rounded-md shadow-xl/10 p-8 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">{sections[1].title}</h2>
          <div className="mb-4">{sections[1].content}</div>
          {sections[0].image && (
            <div className="w-full aspect-[4/3] overflow-hidden flex items-center justify-center rounded-lg">
              <img
                src={sections[1].image}
                alt=""
                className="w-auto h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
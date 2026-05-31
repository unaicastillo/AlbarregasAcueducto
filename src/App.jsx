import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import React, { useRef, useEffect, useState } from "react";

function FloatingIsland() {
  const { scene } = useGLTF("/model.glb");
  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });
  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1.5} />
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <directionalLight position={[-4, 3, -4]} intensity={0.4} color="#b0c8ff" />
      <FloatingIsland />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
      />
    </>
  );
}

function StatCard({ value, label }) {
  return (
    <Card className="bg-slate-950/90 border border-slate-800 text-center py-6 shadow-sm">
      <CardContent className="p-0 space-y-3">
        <div className="text-3xl font-bold text-violet-300">{value}</div>
        <div className="text-sm text-slate-300 mt-1">{label}</div>
      </CardContent>
    </Card>
  );
}

const ciclos = {
  todos: [
    { title: "Informática y Comunicaciones", nivel: "GM · GS", desc: "Desarrollo de aplicaciones multiplataforma y web, sistemas microinformáticos y redes.", detalle: "Aprenderás a desarrollar aplicaciones web y móviles, gestionar redes empresariales y mantener sistemas informáticos. Alta demanda laboral en empresas tecnológicas de toda España." },
    { title: "Administración y Gestión", nivel: "GM · GS", desc: "Administración y finanzas, gestión administrativa para el mundo empresarial.", detalle: "Formación completa en contabilidad, recursos humanos, gestión documental y atención al cliente. Salidas profesionales en cualquier tipo de empresa o administración pública." },
    { title: "Electricidad y Electrónica", nivel: "GM · GS", desc: "Instalaciones eléctricas y automáticas, mantenimiento electrónico.", detalle: "Instalación y mantenimiento de sistemas eléctricos, domótica e industria 4.0. Sector con gran demanda debido a la transición energética." },
    { title: "Edificación y Obra Civil", nivel: "GS", desc: "Proyectos de edificación y urbanismo con empresas del sector.", detalle: "Diseño y gestión de proyectos de construcción, reforma y urbanismo. Colaboración directa con estudios de arquitectura e ingeniería de Mérida." },
    { title: "Sanidad", nivel: "GM", desc: "Auxiliar de enfermería, cuidados auxiliares y emergencias sanitarias.", detalle: "Prácticas en hospitales y centros de salud de Mérida. Formación en cuidados básicos, urgencias y atención al paciente." },
    { title: "Imagen Personal", nivel: "GM · GS", desc: "Estética y belleza, peluquería y cosmética capilar.", detalle: "Técnicas de vanguardia en estética integral, maquillaje, peluquería y cosmética. Talleres con profesionales del sector y pasarelas propias del centro." },
  ],
  gm: [],
  gs: [],
};
ciclos.gm = ciclos.todos.filter(c => c.nivel.includes("GM"));
ciclos.gs = ciclos.todos.filter(c => c.nivel.includes("GS"));

function CicloCard({ c, onClick }) {
  return (
    <Card className="bg-slate-950/90 border border-slate-800 hover:shadow-xl hover:border-violet-500/40 transition-all">
      <CardContent className="p-6 space-y-3 flex flex-col h-full">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-100 text-lg leading-tight">{c.title}</h3>
          <Badge className="bg-violet-700/20 text-violet-200 border-0 text-xs shrink-0">{c.nivel}</Badge>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed flex-1">{c.desc}</p>
        <Button
          variant="outline"
          className="border-violet-500/40 text-violet-300 hover:bg-violet-500/10 text-sm mt-2 w-full"
          onClick={onClick}
        >
          Ver más
        </Button>
      </CardContent>
    </Card>
  );
}

export default function App() {
  const [modelHint, setModelHint] = useState(true);
  const [selectedCiclo, setSelectedCiclo] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setModelHint(false), 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.22),transparent_30%),linear-gradient(to_bottom,_#120621,_#190a38)] text-slate-100" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>

      {/* NAV */}
      <nav className="sticky top-0 z-30 flex items-center justify-between px-8 py-5 md:px-16 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/70 shadow-sm">
        <span className="text-xl font-bold tracking-widest uppercase text-violet-300">
          IES Albarregas
        </span>
        <div className="hidden md:flex gap-6 text-sm text-slate-300">
          <a href="#sobre" className="hover:text-violet-300 transition-colors">Sobre nosotros</a>
          <a href="#ciclos" className="hover:text-violet-300 transition-colors">Ciclos</a>
          <a href="#valores" className="hover:text-violet-300 transition-colors">Valores</a>
        </div>
        <Button variant="outline" className="border-violet-500 text-violet-200 hover:bg-violet-500/10" onClick={() => window.location.hash = '#contacto'}>
          Contáctanos
        </Button>
      </nav>

      {/* HERO */}
      <section className="relative min-h-[calc(100vh-73px)] flex flex-col">
        <div className="flex-1 grid md:grid-cols-2 items-center px-8 md:px-16 gap-8 pb-12 pt-8">
          <div className="space-y-6 max-w-xl">
            <Badge className="bg-violet-700/20 text-violet-200 text-xs tracking-widest uppercase border-0">
              Mérida · Extremadura
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-slate-100">
              Donde el pasado<br />
              <span className="text-violet-300">inspira</span> tu futuro
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-md">
              En el IES Albarregas combinamos la riqueza histórica de Mérida con formación
              técnica de vanguardia. Prepárate para el mundo que viene.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button className="bg-violet-600 hover:bg-violet-500 text-white px-8 py-3 text-base shadow-lg shadow-violet-500/30" onClick={() => window.location.hash = '#ciclos'}>
                Descubre los ciclos
              </Button>
            </div>
          </div>

          <div className="relative h-[420px] md:h-[520px] mt-10 md:mt-0">
            {modelHint && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-slate-950/90 text-slate-200 text-xs px-4 py-2 rounded-full shadow-lg border border-slate-700 pointer-events-none">
                Arrastra para rotar
              </div>
            )}
            <Canvas
              camera={{ position: [0, 3, 40], fov: 35 }}
              style={{ borderRadius: "1.5rem", background: "linear-gradient(to bottom, #d4e8f0 0%, #f7f0e3 100%)" }}
            >
              <Scene />
            </Canvas>
          </div>
        </div>
      </section>

      <Separator className="bg-violet-500/20" />

      {/* STATS */}
      <section className="px-8 md:px-16 py-16 grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard value="30+" label="Años de historia" />
        <StatCard value="1.200" label="Alumnos activos" />
        <StatCard value="12" label="Ciclos formativos" />
        <StatCard value="95%" label="Inserción laboral" />
      </section>

      <Separator className="bg-violet-500/20" />

      {/* SOBRE NOSOTROS */}
      <section id="sobre" className="px-8 md:px-16 py-20 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <Badge className="bg-violet-700/20 text-violet-200 text-xs tracking-widest uppercase border-0">Nuestra historia</Badge>
          <h2 className="text-4xl font-bold text-slate-100 leading-tight">
            Raíces en la ciudad romana más importante de Hispania
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Situado en el corazón de Mérida, ciudad declarada Patrimonio de la Humanidad por
            la UNESCO, el IES Albarregas toma su nombre del río que vertebra la capital extremeña.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Nuestro centro lleva décadas formando profesionales comprometidos, creativos y
            capaces de afrontar los retos del siglo XXI con rigor y vocación.
          </p>
        </div>
        <div className="relative">
          <div className="rounded-2xl bg-slate-950/90 border border-slate-800 p-8 space-y-4">
            <h3 className="text-xl font-semibold text-slate-100">El Acueducto de los Milagros</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Construido en el siglo I d.C., es uno de los monumentos romanos mejor conservados
              de España y símbolo de la ingeniería extremeña. Nuestro emblema de excelencia.
            </p>
            <Badge className="bg-violet-700/20 text-violet-200 border-0 text-xs">Patrimonio de la Humanidad</Badge>
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-violet-700/20 -z-10" />
        </div>
      </section>

      <Separator className="bg-violet-500/20" />

      {/* CICLOS con Tabs + Dialog */}
      <section id="ciclos" className="px-8 md:px-16 py-20 bg-slate-950/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 space-y-3">
            <Badge className="bg-violet-700/20 text-violet-200 border-0 text-xs tracking-widest uppercase">Formación</Badge>
            <h2 className="text-4xl font-bold text-slate-100">Ciclos Formativos</h2>
            <p className="text-slate-300 max-w-xl mx-auto">
              Ofrecemos formación de grado medio y superior en familias profesionales que
              responden a las demandas reales del mercado laboral.
            </p>
          </div>

          {/* TABS — componente Shadcn visible */}
          {/* Selector de tabs manual */}
          {(() => {
            const [tabActivo, setTabActivo] = React.useState("todos");
            return (
              <div className="w-full">
                <div className="flex justify-center gap-2 mb-8">
                  {[["todos", "Todos"], ["gm", "Grado Medio"], ["gs", "Grado Superior"]].map(([val, label]) => (
                    <button
                      key={val}
                      onClick={() => setTabActivo(val)}
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-all border ${tabActivo === val
                          ? "bg-violet-600 text-white border-violet-600"
                          : "bg-slate-900 text-slate-300 border-slate-700 hover:border-violet-500/50"
                        }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {ciclos[tabActivo].map((c, i) => (
                    <CicloCard key={i} c={c} onClick={() => setSelectedCiclo(c)} />
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* DIALOG — se abre al pulsar "Ver más" en cualquier ciclo */}
      <Dialog open={!!selectedCiclo} onOpenChange={() => setSelectedCiclo(null)}>
        <DialogContent className="bg-slate-950 border border-slate-800 text-slate-100">
          <DialogHeader>
            <DialogTitle className="text-violet-300 text-xl">{selectedCiclo?.title}</DialogTitle>
            <DialogDescription className="text-slate-400 text-sm pt-1">
              Nivel: {selectedCiclo?.nivel}
            </DialogDescription>
          </DialogHeader>
          <p className="text-slate-300 leading-relaxed text-sm mt-2">{selectedCiclo?.detalle}</p>
          <Button
            className="bg-violet-600 hover:bg-violet-500 text-white mt-4 w-full"
            onClick={() => { setSelectedCiclo(null); window.location.hash = '#contacto'; }}
          >
            Solicitar información
          </Button>
        </DialogContent>
      </Dialog>

      <Separator className="bg-violet-500/20" />

      {/* VALORES */}
      <section id="valores" className="px-8 md:px-16 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <Badge className="bg-violet-700/20 text-violet-200 border-0 text-xs tracking-widest uppercase">¿Por qué elegirnos?</Badge>
          <h2 className="text-4xl font-bold text-slate-100">Nuestros valores</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Comunidad", desc: "Un ambiente inclusivo y colaborativo donde cada alumno importa." },
            { title: "Innovación", desc: "Talleres, laboratorios y proyectos reales con empresas locales." },
            { title: "Sostenibilidad", desc: "Comprometidos con el medioambiente en cada decisión del centro." },
            { title: "Excelencia", desc: "Premio a la Calidad Educativa de la Junta de Extremadura." },
          ].map((v, i) => (
            <div key={i} className="text-center space-y-3 p-6 rounded-2xl hover:bg-slate-900 transition-colors bg-slate-950/90 border border-slate-800">
              <h3 className="font-semibold text-slate-100">{v.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator className="bg-violet-500/20" />

      {/* FAQ con Accordion — componente Shadcn visible */}
      

      <Separator className="bg-violet-500/20" />

      {/* CONTACTO */}
      <section id="contacto" className="px-8 md:px-16 py-20 bg-slate-950/60">
        <div className="max-w-5xl mx-auto text-center">
          <Badge className="bg-violet-700/20 text-violet-200 border-0 text-xs tracking-widest uppercase">Contacto</Badge>
          <h2 className="text-4xl font-bold text-slate-100 mt-6">¿Listo para hacer tu matrícula?</h2>
          <p className="text-slate-300 max-w-2xl mx-auto mt-4 leading-relaxed">
            Ven al IES Albarregas, descubre nuestras instalaciones y recibe asesoramiento personalizado para elegir el ciclo formativo que mejor encaja contigo.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-950/90 border border-slate-800 p-6 text-left">
              <p className="text-sm uppercase tracking-widest text-violet-200">Dirección</p>
              <p className="mt-3 text-slate-300">Calle de la Historia 12, Mérida</p>
              <p className="mt-1 text-slate-400">Horario: L-V 9:00 - 17:00</p>
            </div>
            <div className="rounded-3xl bg-slate-950/90 border border-slate-800 p-6 text-left">
              <p className="text-sm uppercase tracking-widest text-violet-200">Contacto</p>
              <p className="mt-3 text-slate-300">info@iesalbarregas.es</p>
              <p className="mt-1 text-slate-400">Tel: 927 000 000</p>
            </div>
          </div>
        </div>
      </section>

      <Separator className="bg-violet-500/20" />

      <footer className="bg-slate-950 text-slate-400 text-center text-xs py-6">
        © 2026 IES Albarregas · Mérida, Extremadura · Todos los derechos reservados
      </footer>
    </div>
  );
}
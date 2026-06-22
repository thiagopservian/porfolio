# Multimedia por tarjeta

Cada subcarpeta corresponde a una tarjeta y usa el mismo `id` que el código.
Subí acá las fotos/videos de cada una (cualquier nombre: `1.jpg`, `2.png`, `demo.mp4`, etc.).

## Proyectos — `projects/<id>/`
| id | Proyecto |
|----|----------|
| `melodia` | Melodía |
| `vibetrip` | VibeTrip |
| `cassandra-engine` | Cassandra Engine |
| `specforge` | SpecForge |
| `predictive-models` | Predictive Models & AI Analysis |
| `monopoly` | Monopoly Game Engine |
| `zorro-ocas` | Zorro y Ocas (Assembly) |

## Línea de tiempo — `timeline/<id>/`
| id | Tarjeta |
|----|---------|
| `uba` | Universidad de Buenos Aires |
| `lovelytics` | Lovelytics |
| `fiubaton` | FIUBAtón 2025 |
| `pellegrini` | Carlos Pellegrini |
| `olympiad` | Olimpiada Nacional de Informática |

## Notas
- Formatos recomendados: **imágenes** `.jpg` / `.png` / `.webp`, **videos** `.mp4` / `.webm`.
- El nombre de cada archivo no importa; se cargarán todos los de la carpeta, en orden alfabético.
- Una vez que subas los archivos, avisame y conecto cada carpeta a su galería
  (hoy las galerías muestran *placeholders*). Se cargarán con `import.meta.glob`
  de Vite, así que la ruta y el cache los maneja el bundler automáticamente.
- El `.gitkeep` de cada carpeta es solo para que la carpeta vacía quede en git;
  podés dejarlo o borrarlo cuando subas archivos.

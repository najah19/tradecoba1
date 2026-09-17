import React, { useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import { ACADEMY_COURSES } from '../../data/mockData';
import { AcademyCourse, CourseLesson } from '../../types';
import { 
  GraduationCap, 
  BookOpen, 
  PlayCircle, 
  CheckCircle2, 
  Clock, 
  Award, 
  X, 
  ArrowRight,
  ChevronRight,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const AcademyView: React.FC = () => {
  const { addToast } = useMarket();
  const [courses, setCourses] = useState<AcademyCourse[]>(ACADEMY_COURSES);
  const [selectedCourse, setSelectedCourse] = useState<AcademyCourse | null>(null);
  const [activeLesson, setActiveLesson] = useState<CourseLesson | null>(null);

  const handleOpenCourse = (course: AcademyCourse) => {
    setSelectedCourse(course);
    setActiveLesson(course.lessons[0]);
  };

  const handleCompleteLesson = (courseId: string, lessonId: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id !== courseId) return c;
        const updatedLessons = c.lessons.map((l) =>
          l.id === lessonId ? { ...l, completed: true } : l
        );
        const completedCount = updatedLessons.filter((l) => l.completed).length;
        const progress = Math.round((completedCount / updatedLessons.length) * 100);
        return { ...c, lessons: updatedLessons, progress };
      })
    );

    if (selectedCourse) {
      const updatedLessons = selectedCourse.lessons.map((l) =>
        l.id === lessonId ? { ...l, completed: true } : l
      );
      const completedCount = updatedLessons.filter((l) => l.completed).length;
      setSelectedCourse({
        ...selectedCourse,
        lessons: updatedLessons,
        progress: Math.round((completedCount / updatedLessons.length) * 100),
      });
    }

    addToast('success', 'Materi Selesai!', 'Progres pembelajaran Anda telah tercatat.');
  };

  return (
    <div id="academy-page" className="py-10 bg-[#080B12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-yellow-500" />
              <span className="text-yellow-500 font-mono text-xs font-bold uppercase tracking-widest">
                Financial Learning Hub
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Trading Academy & Masterclass
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Kurikulum terstruktur dari pengenalan instrumen emas hingga strategi price action institusional.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="px-4 py-2 bg-[#10151F] rounded-lg border border-white/10 text-right">
              <span className="text-[10px] text-gray-400 block font-mono">STATUS SERTIFIKASI</span>
              <span className="text-xs font-bold text-yellow-500">Siap Mengikuti Ujian Akun Live</span>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => {
            return (
              <div
                key={course.id}
                id={`course-card-${course.id}`}
                onClick={() => handleOpenCourse(course)}
                className="group cursor-pointer bg-[#10151F] hover:bg-[#151c2a] border border-white/10 hover:border-yellow-500/40 rounded-lg overflow-hidden transition-all duration-200 shadow-md flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Banner */}
                  <div className="relative h-36 overflow-hidden bg-black">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-sm bg-black/80 backdrop-blur-sm text-[10px] font-mono font-bold text-yellow-500 border border-yellow-500/30">
                      {course.level}
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-sm bg-black/80 backdrop-blur-sm text-[10px] font-mono text-gray-300 flex items-center gap-1 border border-white/10">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-bold text-white group-hover:text-yellow-500 transition leading-snug line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    <div className="text-[11px] text-gray-500 pt-1 font-mono">
                      Instruktur: <strong className="text-gray-300">{course.instructor}</strong>
                    </div>
                  </div>
                </div>

                {/* Progress Bar & Footer */}
                <div className="p-4 pt-2 border-t border-white/10">
                  <div className="flex justify-between text-[11px] font-mono text-gray-400 mb-1">
                    <span>Progres Kursus</span>
                    <span className="text-yellow-500 font-bold">{course.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
                    <div
                      className="bg-yellow-500 h-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenCourse(course);
                    }}
                    className="w-full py-2 bg-white/5 hover:bg-yellow-500 hover:text-black text-gray-200 font-bold text-xs rounded-sm transition flex items-center justify-center space-x-1.5 cursor-pointer border border-white/10 hover:border-yellow-500"
                  >
                    <span>{course.progress > 0 ? 'Lanjutkan Belajar' : 'Mulai Pelajaran'}</span>
                    <PlayCircle className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Course Reader & Lesson Player Modal (Section 29) */}
      {selectedCourse && activeLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-4xl bg-[#10151F] border border-white/15 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/10 bg-[#080B12]">
              <div className="flex items-center space-x-3">
                <GraduationCap className="w-5 h-5 text-yellow-500" />
                <div>
                  <h3 className="text-sm font-bold text-white truncate max-w-md">
                    {selectedCourse.title}
                  </h3>
                  <span className="text-xs text-gray-400 font-mono">
                    Pelajaran: {activeLesson.title} ({activeLesson.duration})
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="p-1 text-gray-400 hover:text-white rounded-sm hover:bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Split View: Syllabus Sidebar & Lesson Body */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Left Syllabus Nav */}
              <div className="w-full md:w-72 bg-[#080B12] border-r border-white/10 p-4 overflow-y-auto space-y-1.5 shrink-0">
                <div className="text-[11px] font-bold text-gray-400 uppercase font-mono mb-2">
                  Daftar Silabus ({selectedCourse.lessons.length} Pelajaran)
                </div>
                {selectedCourse.lessons.map((lesson, idx) => (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLesson(lesson)}
                    className={`w-full text-left p-2.5 rounded-sm text-xs transition flex items-center justify-between cursor-pointer ${
                      activeLesson.id === lesson.id
                        ? 'bg-yellow-500/15 text-yellow-500 font-bold border border-yellow-500/30'
                        : 'text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <span className="font-mono text-[10px] text-gray-500">{idx + 1}.</span>
                      <span className="truncate">{lesson.title}</span>
                    </div>
                    {lesson.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-[#00FF95] shrink-0 ml-1" />
                    ) : (
                      <span className="text-[10px] text-gray-500 font-mono shrink-0 ml-1">
                        {lesson.duration}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Right Lesson Content */}
              <div className="flex-1 p-6 overflow-y-auto space-y-5 bg-[#10151F]">
                {/* Visual Video Container Placeholder */}
                <div className="w-full aspect-video bg-[#080B12] rounded-lg border border-white/10 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                  <div className="w-14 h-14 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-500 mb-2 cursor-pointer hover:scale-110 transition shadow-lg">
                    <PlayCircle className="w-8 h-8 fill-yellow-500/20" />
                  </div>
                  <span className="text-sm font-bold text-white">Video Materi Masterclass</span>
                  <span className="text-xs text-gray-400 font-mono mt-0.5">
                    Modul {activeLesson.title} • Durasi {activeLesson.duration}
                  </span>
                </div>

                {/* Lesson Text Description */}
                <div className="space-y-3">
                  <h4 className="text-base font-bold text-white">
                    Ringkasan Materi Pelajaran
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {activeLesson.summary}
                  </p>
                </div>

                {/* Key Points */}
                <div className="p-4 bg-[#080B12] rounded-sm border border-white/10 space-y-2">
                  <h5 className="text-xs font-bold text-yellow-500 uppercase font-mono tracking-wider">
                    Poin Kunci Yang Harus Dipahami:
                  </h5>
                  <ul className="space-y-1 text-xs text-gray-300">
                    <li>• Kontrak standar XAUUSD memiliki ukuran 100 troy ounce per 1.0 lot.</li>
                    <li>• Fluktuasi $1 pada emas bernilai $100 per 1.0 lot atau $10 per 0.1 lot.</li>
                    <li>• Selalu pasang Stop Loss sebelum menekan tombol Buy atau Sell.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between px-6 py-3.5 border-t border-white/10 bg-[#080B12]">
              <button
                onClick={() => handleCompleteLesson(selectedCourse.id, activeLesson.id)}
                className={`px-4 py-2 rounded-sm text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  activeLesson.completed
                    ? 'bg-[#00FF95]/20 text-[#00FF95] border border-[#00FF95]/30'
                    : 'bg-yellow-500 hover:bg-yellow-400 text-black font-bold'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{activeLesson.completed ? 'Selesai Dipelajari' : 'Tandai Selesai'}</span>
              </button>

              <button
                onClick={() => {
                  const currIdx = selectedCourse.lessons.findIndex((l) => l.id === activeLesson.id);
                  if (currIdx < selectedCourse.lessons.length - 1) {
                    setActiveLesson(selectedCourse.lessons[currIdx + 1]);
                  } else {
                    addToast('success', 'Selamat!', 'Anda telah menuntaskan seluruh pelajaran kursus ini!');
                  }
                }}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold rounded-sm flex items-center gap-1 border border-white/10 cursor-pointer"
              >
                <span>Pelajaran Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

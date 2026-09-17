import React, { useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import { COMMUNITY_POSTS } from '../../data/mockData';
import { CommunityPost } from '../../types';
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Share2, 
  PlusCircle, 
  ShieldCheck, 
  TrendingUp, 
  Send, 
  X,
  Sparkles
} from 'lucide-react';

export const CommunityView: React.FC = () => {
  const { addToast } = useMarket();
  const [posts, setPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS);
  const [selectedChannel, setSelectedChannel] = useState<string>('Semua');
  const [newPostOpen, setNewPostOpen] = useState<boolean>(false);

  // New Post Form State
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostSymbol, setNewPostSymbol] = useState('XAUUSD');

  // Selected Post for comments
  const [activePost, setActivePost] = useState<CommunityPost | null>(null);
  const [commentInput, setCommentInput] = useState('');

  const channels = ['Semua', 'XAUUSD / Gold', 'Forex Major', 'Risk & Psychology', 'Pemula'];

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
    if (activePost && activePost.id === id) {
      setActivePost({ ...activePost, likes: activePost.likes + 1 });
    }
    addToast('info', 'Disukai', 'Apresiasi Anda telah terkirim ke rekan trader.');
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      addToast('warning', 'Form Belum Lengkap', 'Mohon isi judul dan isi postingan.');
      return;
    }

    const created: CommunityPost = {
      id: `post-${Date.now()}`,
      author: {
        name: 'Trader Anda (Demo)',
        username: '@trader_anda',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        badge: 'Verified Trader',
        role: 'Verified Trader',
      },
      title: newPostTitle,
      content: newPostContent,
      symbol: newPostSymbol,
      tags: [`#${newPostSymbol}`, '#TradingIndonesia'],
      timestamp: 'Baru saja',
      sentiment: 'BULLISH',
      likes: 1,
      commentsCount: 0,
      createdAt: 'Baru saja',
      comments: [],
    };

    setPosts([created, ...posts]);
    setNewPostOpen(false);
    setNewPostTitle('');
    setNewPostContent('');
    addToast('success', 'Diskusi Diterbitkan!', 'Postingan Anda sekarang dapat dilihat oleh komunitas.');
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim() || !activePost) return;

    const newComment = {
      id: `c-${Date.now()}`,
      author: 'Anda (Trader)',
      text: commentInput.trim(),
      timeAgo: 'Baru saja',
    };

    const updated = {
      ...activePost,
      commentsCount: activePost.commentsCount + 1,
      comments: [...activePost.comments, newComment],
    };

    setActivePost(updated);
    setPosts((prev) => prev.map((p) => (p.id === activePost.id ? updated : p)));
    setCommentInput('');
    addToast('success', 'Komentar Terkirim', 'Komentar Anda telah ditambahkan.');
  };

  return (
    <div id="community-page" className="py-10 bg-[#080B12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-yellow-500" />
              <span className="text-yellow-500 font-mono text-xs font-bold uppercase tracking-widest">
                Indonesian Trader Ecosystem
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Komunitas & Forum Trader Global
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Berbagi sudut pandang teknikal, tanya jawab seputar setup XAUUSD, dan berdiskusi dengan sesama trader aktif.
            </p>
          </div>

          <button
            onClick={() => setNewPostOpen(true)}
            className="px-4 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs rounded-sm transition flex items-center space-x-2 shadow-sm cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Buat Diskusi Baru</span>
          </button>
        </div>

        {/* Channel Badges */}
        <div className="flex items-center overflow-x-auto no-scrollbar gap-2 mb-6 p-1 bg-[#10151F] rounded-lg border border-white/10">
          {channels.map((chan) => (
            <button
              key={chan}
              onClick={() => setSelectedChannel(chan)}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                selectedChannel === chan
                  ? 'bg-yellow-500 text-black font-bold shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {chan}
            </button>
          ))}
        </div>

        {/* Posts Feed Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-8 space-y-4">
            {posts.map((post) => {
              return (
                <div
                  key={post.id}
                  id={`post-card-${post.id}`}
                  onClick={() => setActivePost(post)}
                  className="cursor-pointer bg-[#10151F] hover:bg-[#151c2a] border border-white/10 hover:border-yellow-500/40 rounded-lg p-5 transition duration-200 shadow-sm space-y-3"
                >
                  {/* Author Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-9 h-9 rounded-full object-cover border border-yellow-500/30"
                      />
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="text-xs font-bold text-white">{post.author.name}</span>
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                        </div>
                        <span className="text-[10px] text-gray-400 font-mono">{post.author.role}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {post.symbol && (
                        <span className="px-2 py-0.5 rounded-sm bg-yellow-500/10 text-yellow-500 font-mono font-bold text-[11px] border border-yellow-500/30">
                          {post.symbol}
                        </span>
                      )}
                      <span className="text-[10px] text-gray-500 font-mono">{post.createdAt}</span>
                    </div>
                  </div>

                  {/* Post Title & Content Preview */}
                  <div>
                    <h3 className="text-sm font-bold text-white leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed mt-1.5 line-clamp-3">
                      {post.content}
                    </p>
                  </div>

                  {/* Actions & Comment Counts */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-gray-400">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={(e) => handleLike(post.id, e)}
                        className="flex items-center space-x-1.5 hover:text-[#FF3131] transition cursor-pointer"
                      >
                        <Heart className="w-4 h-4" />
                        <span className="font-mono text-xs">{post.likes}</span>
                      </button>

                      <div className="flex items-center space-x-1.5 text-gray-400">
                        <MessageSquare className="w-4 h-4" />
                        <span className="font-mono text-xs">{post.commentsCount} balasan</span>
                      </div>
                    </div>

                    <span className="text-[11px] text-yellow-500 hover:text-yellow-400 font-medium">
                      Buka Thread & Diskusi &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Sidebar: Rules & Hot Topics */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-[#10151F] rounded-lg border border-white/10 p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-yellow-500 font-mono">
                Panduan Komunitas Trader
              </h4>
              <ul className="space-y-2 text-xs text-gray-300 leading-relaxed">
                <li>• <strong>Saling Menghargai:</strong> Tidak diperkenankan promosi robot scam atau klaim profit tanpa risiko.</li>
                <li>• <strong>Data-First:</strong> Sertakan chart screenshot atau level harga saat membagikan ide trading.</li>
                <li>• <strong>Edukasi:</strong> Diskusi ditujukan untuk meningkatkan kecakapan analisis pasar bersama.</li>
              </ul>
            </div>

            <div className="bg-[#10151F] rounded-lg border border-white/10 p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 font-mono">
                Topik Hangat Hari Ini
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-[#080B12] rounded-sm border border-white/10 flex justify-between items-center">
                  <span className="text-gray-200 font-medium">#XAUUSD_AllTimeHigh</span>
                  <span className="text-[10px] text-yellow-500 font-mono font-bold">142 Post</span>
                </div>
                <div className="p-2.5 bg-[#080B12] rounded-sm border border-white/10 flex justify-between items-center">
                  <span className="text-gray-200 font-medium">#FOMC_RateCut_25bps</span>
                  <span className="text-[10px] text-yellow-500 font-mono font-bold">98 Post</span>
                </div>
                <div className="p-2.5 bg-[#080B12] rounded-sm border border-white/10 flex justify-between items-center">
                  <span className="text-gray-200 font-medium">#ManajemenRisiko_1Persen</span>
                  <span className="text-[10px] text-yellow-500 font-mono font-bold">64 Post</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create New Post Modal */}
      {newPostOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-[#10151F] border border-white/15 rounded-lg shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#080B12]">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-yellow-500" />
                Mulai Diskusi Baru
              </h3>
              <button onClick={() => setNewPostOpen(false)} className="p-1 text-gray-400 hover:text-white rounded-sm hover:bg-white/5 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="p-6 space-y-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1 font-medium">Instrumen Terkait</label>
                <select
                  value={newPostSymbol}
                  onChange={(e) => setNewPostSymbol(e.target.value)}
                  className="w-full px-3 py-2 bg-[#080B12] border border-white/10 rounded-sm text-xs text-white font-mono focus:outline-none focus:border-yellow-500"
                >
                  <option value="XAUUSD">XAUUSD (Emas)</option>
                  <option value="EURUSD">EURUSD</option>
                  <option value="NAS100">NAS100</option>
                  <option value="USOIL">USOIL</option>
                  <option value="BTCUSD">BTCUSD</option>
                  <option value="UMUM">Umum / Edukasi</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1 font-medium">Judul Diskusi</label>
                <input
                  type="text"
                  placeholder="Contoh: Proyeksi Reversal XAUUSD Pasca Rejection $3465..."
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#080B12] border border-white/10 rounded-sm text-xs text-white focus:outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1 font-medium">Isi Analisis atau Pertanyaan</label>
                <textarea
                  rows={4}
                  placeholder="Jelaskan sudut pandang teknikal, level harga acuan, atau pertanyaan Anda..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="w-full px-3 py-2 bg-[#080B12] border border-white/10 rounded-sm text-xs text-white focus:outline-none focus:border-yellow-500"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewPostOpen(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 text-xs rounded-sm border border-white/10 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs rounded-sm shadow-sm cursor-pointer"
                >
                  Terbitkan Diskusi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Comments Drawer Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl bg-[#10151F] border border-white/15 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#080B12]">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-yellow-500" />
                <span className="font-bold text-xs text-white">Thread Diskusi</span>
              </div>
              <button onClick={() => setActivePost(null)} className="p-1 text-gray-400 hover:text-white rounded-sm hover:bg-white/5 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Post details */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img src={activePost.author.avatar} alt="" className="w-7 h-7 rounded-full object-cover border border-yellow-500/30" />
                    <span className="text-xs font-bold text-white">{activePost.author.name}</span>
                    <span className="text-[10px] text-gray-400 font-mono">• {activePost.createdAt}</span>
                  </div>
                  {activePost.symbol && (
                    <span className="text-[10px] font-mono font-bold text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-sm border border-yellow-500/30">
                      {activePost.symbol}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-white mt-2">{activePost.title}</h3>
                <p className="text-xs text-gray-300 mt-2 leading-relaxed bg-[#080B12] p-3.5 rounded-sm border border-white/10">
                  {activePost.content}
                </p>
              </div>

              {/* Comments list */}
              <div className="pt-2 border-t border-white/10 space-y-3">
                <h4 className="text-xs font-bold text-gray-400 font-mono uppercase">
                  Balasan Komunitas ({activePost.comments.length})
                </h4>
                {activePost.comments.map((c) => (
                  <div key={c.id} className="p-3 bg-[#080B12] rounded-sm border border-white/10 text-xs">
                    <div className="flex justify-between items-center text-gray-400 mb-1">
                      <span className="font-bold text-white">{c.author}</span>
                      <span className="text-[10px] font-mono">{c.timeAgo}</span>
                    </div>
                    <p className="text-gray-300">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Post Comment Input */}
            <form onSubmit={handleAddComment} className="p-4 border-t border-white/10 bg-[#080B12] flex gap-2">
              <input
                type="text"
                placeholder="Tulis tanggapan atau analisis Anda..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="flex-1 px-3 py-2 bg-[#10151F] border border-white/10 rounded-sm text-xs text-white focus:outline-none focus:border-yellow-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs rounded-sm transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AnalysisResult } from "@/lib/gemini";
import { Loader2, Copy, Sparkles, Clock, Hash, MessageCircle, ArrowRight, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Footer } from "@/components/Footer";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const { toast } = useToast();
  const [post, setPost] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = async () => {
    if (!post.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter some text to analyze",
        className: "bg-slate-800/90 border border-red-500/20 text-slate-200",
      });
      return;
    }

    setLoading(true);
    setError(null);
    toast({
      title: "Analyzing...",
      description: (
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
          <span>Our AI is optimizing your post</span>
        </div>
      ),
      className: "bg-slate-800/90 border border-slate-700/50 text-slate-200",
    });

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post }),
      });

      if (!res.ok) throw new Error(`Analysis failed: ${res.statusText}`);

      const data: AnalysisResult = await res.json();
      setAnalysis(data);
      toast({
        title: "Analysis Complete!",
        description: (
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span>Your optimized post is ready</span>
          </div>
        ),
        className: "bg-slate-800/90 border border-slate-700/50 text-slate-200",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to analyze post";
      setError(message);
      toast({
        variant: "destructive",
        title: "Error",
        description: message,
        className: "bg-slate-800/90 border  border-red-500/20 text-slate-200",
      });
      setAnalysis(null);
    } finally {
      setLoading(false);
    }
  };

  const copyImprovedPost = async () => {
    if (analysis?.improvedPost) {
      try {
        await navigator.clipboard.writeText(analysis.improvedPost);
        toast({
          title: "Success!",
          description: (
            <div className="flex items-center gap-2">
              <Copy className="h-4 w-4 text-green-400" />
              <span>Post copied to clipboard</span>
            </div>
          ),
          className: " bg-slate-800/90 border border-slate-700/50 text-slate-200",
        });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to copy text",
          className: "bg-slate-800/90 border border-red-500/20 text-slate-200",
        });
      }
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-30" />
        <div className="absolute inset-0">
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 pt-20 pb-32 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-8"
            >
              <div className="p-3 bg-blue-500/10 rounded-2xl">
                <Zap className="w-12 h-12 text-blue-300" />
              </div>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-6xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                AI-Powered Social Media
              </span>
              <br />
              <span className="text-slate-50">Optimization</span>
            </motion.h1>

            <motion.p 
              className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Transform your social media content into engaging posts with our advanced AI technology. Get better reach, more engagement, and higher conversion rates.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center items-center mt-8"
            >
              <div className="flex items-center gap-3 px-4 py-2 bg-slate-800/50 rounded-lg backdrop-blur-sm border border-slate-700/50">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-slate-200">AI-Powered Analysis</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-slate-800/50 rounded-lg backdrop-blur-sm border border-slate-700/50">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-slate-200">Real-time Optimization</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-slate-800/50 rounded-lg backdrop-blur-sm border border-slate-700/50">
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-slate-200">Engagement Boost</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20 -mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <motion.div 
            className="relative"
            variants={fadeIn}
          >
            <Card className="border-0 shadow-2xl bg-slate-800/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <Textarea
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                  placeholder="Enter your post draft..."
                  className="h-40 resize-none bg-slate-900/50 border-slate-700 focus:border-blue-400 placeholder:text-slate-400 text-slate-200"
                  disabled={loading}
                />
                <motion.div
                  className="mt-4 flex justify-end"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    onClick={analyze} 
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg px-6"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <span className="text-slate-100">Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        <span className="text-slate-100">Optimize Post</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.div
                variants={fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="p-4 bg-red-500/10 border border-red-500/20 text-red-300 rounded-lg backdrop-blur-sm"
              >
                {error}
              </motion.div>
            )}

            {analysis && (
              <motion.div
                variants={stagger}
                initial="initial"
                animate="animate"
                className="space-y-6"
              >
                <motion.div variants={fadeIn}>
                  <Card className="border-0 shadow-2xl bg-slate-800/50 backdrop-blur-sm overflow-hidden">
                    <CardHeader className="border-b border-slate-700/50">
                      <CardTitle className="flex items-center gap-2 text-blue-300">
                        <MessageCircle className="h-5 w-5" />
                        Optimized Captions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                      {analysis.captions.map((caption, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-4 bg-slate-900/50 rounded-lg backdrop-blur-sm border border-slate-700/50 text-slate-200"
                        >
                          {caption}
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={fadeIn}>
                  <Card className="border-0 shadow-2xl bg-slate-800/50 backdrop-blur-sm">
                    <CardHeader className="border-b border-slate-700/50">
                      <CardTitle className="flex items-center gap-2 text-purple-300">
                        <Hash className="h-5 w-5" />
                        Viral Hashtags
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2 p-6">
                      {analysis.hashtags.map((tag, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full hover:bg-purple-500/20 transition-colors border border-purple-500/20"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-2xl bg-slate-800/50 backdrop-blur-sm">
                    <CardHeader className="border-b border-slate-700/50">
                      <CardTitle className="flex items-center gap-2 text-blue-300">
                        <Clock className="h-5 w-5" />
                        Best Posting Time
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                        {analysis.bestTime || "N/A"}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-2xl bg-slate-800/50 backdrop-blur-sm">
                    <CardHeader className="border-b border-slate-700/50">
                      <CardTitle className="text-blue-300">Sentiment Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <motion.div 
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className={`flex items-center gap-2 ${
                          analysis.sentiment === "positive" ? "text-green-300" :
                          analysis.sentiment === "negative" ? "text-red-300" :
                          "text-yellow-300"
                        }`}
                      >
                        <span className="text-2xl font-bold capitalize">
                          {analysis.sentiment}
                        </span>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={fadeIn}>
                  <Card className="border-0 shadow-2xl bg-slate-800/50 backdrop-blur-sm">
                    <CardHeader className="border-b border-slate-700/50">
                      <CardTitle className="flex justify-between items-center text-blue-300">
                        Improved Post
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyImprovedPost}
                          className="flex gap-2 items-center border-slate-700 hover:bg-slate-700/50 text-slate-500 hover:text-slate-200"
                        >
                          <Copy className="h-4 w-4" />
                          Copy
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <motion.div 
                        className="p-4 bg-slate-900/50 rounded-lg whitespace-pre-wrap backdrop-blur-sm border border-slate-700/50 text-slate-200"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {analysis.improvedPost}
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <Footer/>
    </div>
  );
}
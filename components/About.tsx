'use client';

import { motion } from 'framer-motion';
import { aboutData } from '@/data/about';
import { Code, Lightbulb, Heart } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="min-h-screen py-20 px-6 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-purple-950">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-24 h-2 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  My Story
                </h3>
              </div>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {aboutData.bio.paragraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills & Interests */}
          <div className="space-y-8">
            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Skills & Expertise
                  </h3>
                </div>
                <div className="space-y-6">
                  {aboutData.skills.map((skillCategory, idx) => (
                    <div key={idx}>
                      <h4 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-3 text-lg">
                        {skillCategory.category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skillCategory.items.map((skill, skillIdx) => (
                          <span
                            key={skillIdx}
                            className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-gray-900 dark:text-white rounded-full text-sm font-medium hover:scale-105 transition-transform duration-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Interests */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-pink-600 to-purple-600 rounded-xl">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Interests
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {aboutData.interests.map((interest, idx) => (
                    <div
                      key={idx}
                      className="px-4 py-3 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900 text-gray-900 dark:text-white rounded-xl text-center font-medium hover:scale-105 transition-transform duration-200"
                    >
                      {interest}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

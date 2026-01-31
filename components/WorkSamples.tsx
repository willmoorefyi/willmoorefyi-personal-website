'use client';

import { motion } from 'framer-motion';
import { workSamples } from '@/data/workSamples';
import { ExternalLink, Code2, FolderGit2 } from 'lucide-react';
import Image from 'next/image';

export default function WorkSamples() {
  return (
    <section id="work-samples" className="min-h-screen py-20 px-6 bg-gray-50 dark:bg-gray-900">
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
            Work Samples
          </h2>
          <div className="w-24 h-2 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full" />
        </motion.div>

        {/* Work Samples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {workSamples.map((sample, index) => (
            <motion.div
              key={sample.id}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Content Card */}
              <div className="h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 flex flex-col">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-900 dark:text-purple-100 rounded-full text-sm font-semibold">
                    {sample.category === 'Open Source' && <FolderGit2 className="w-4 h-4" />}
                    {sample.category === 'Personal Project' && <Code2 className="w-4 h-4" />}
                    {sample.category === 'Professional Work' && <Code2 className="w-4 h-4" />}
                    {sample.category}
                  </span>
                  {sample.link && (
                    <a
                      href={sample.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 dark:text-purple-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                      aria-label={`Visit ${sample.title}`}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>

                {/* Optional Image */}
                {sample.image && (
                  <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4 overflow-hidden">
                    <Image
                      src={sample.image}
                      alt={sample.title}
                      width={400}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {sample.title}
                </h3>

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">
                  {sample.description}
                </p>

                {/* Technologies */}
                <div className="mt-auto">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">
                    Technologies:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {sample.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-gray-900 dark:text-white rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

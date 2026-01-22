'use client';

import { motion } from 'framer-motion';
import { experiences } from '@/data/experience';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import Image from 'next/image';

export default function Experience() {
  return (
    <section id="experience" className="min-h-screen py-20 px-6 bg-white dark:bg-gray-950">
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
            Experience
          </h2>
          <div className="w-24 h-2 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 hidden md:block" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 top-6 w-5 h-5 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full border-4 border-white dark:border-gray-950 hidden md:block z-10" />

                {/* Content Card */}
                <div className="md:ml-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      {/* Company Logo (if provided) */}
                      {exp.logo && (
                        <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                          <Image
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            width={48}
                            height={48}
                            className="object-contain"
                          />
                        </div>
                      )}

                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-3">
                          <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          {exp.company}
                        </div>
                      </div>
                    </div>

                    {/* Date & Location */}
                    <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400 md:text-right">
                      <div className="flex items-center gap-2 md:justify-end">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 md:justify-end">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-4">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                      Key Achievements:
                    </h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                        >
                          <span className="text-purple-600 dark:text-purple-400 font-bold mt-1">
                            •
                          </span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                      Technologies:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-gray-900 dark:text-white rounded-full text-sm font-medium"
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
      </div>
    </section>
  );
}

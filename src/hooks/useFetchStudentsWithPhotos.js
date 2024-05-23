import { useState, useCallback } from 'react';
import { getAllStudents, getStudentPhotoById } from '../services/student';

export const useFetchStudentsWithPhotos = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudentsWithPhotos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const studentsData = await getAllStudents();
      const studentsWithPhotos = await Promise.all(studentsData.map(async (student) => {
        const photo = await getStudentPhotoById(student.id);
        student.avatar = URL.createObjectURL(photo);
        return student;
      }));
      setStudents(studentsWithPhotos);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { students, loading, error, fetchStudentsWithPhotos };
};
import React, { useState } from "react";
import { studentApi } from '../../api/student';
import { motion } from 'framer-motion';

const Update = ({ navigateBack, navigateHome }) => {
  const [query, setQuery] = useState({ SBD: "", Year: "" });
  const [studentData, setStudentData] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setError(null);
      const data = await studentApi.getStudent(query.SBD);
      // Lọc theo năm nếu có
      const filteredData = query.Year 
        ? data.filter(student => student['Năm'].toString() === query.Year)
        : data;
      
      if (filteredData.length > 0) {
        setStudentData(filteredData[0]);
        setUpdatedData(filteredData[0]);
      } else {
        setError('Không tìm thấy thí sinh với thông tin này');
      }
    } catch (error) {
      setError('Lỗi khi tìm kiếm: ' + error.message);
    }
  };

  const handleFieldChange = (field, value) => {
    setUpdatedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      // Tìm các trường đã thay đổi
      const changes = {};
      Object.keys(updatedData).forEach(key => {
        // Chuyển đổi giá trị sang số nếu là điểm
        if (['Toán', 'Văn', 'Lý', 'H��a', 'Sinh', 'Ngoại ngữ', 'Lịch sử', 'Địa lý', 'GDCD'].includes(key)) {
          changes[key] = updatedData[key] === '' ? null : Number(updatedData[key]);
        } else {
          changes[key] = updatedData[key];
        }
      });

      if (Object.keys(changes).length === 0) {
        setError('Không có thông tin nào được thay đổi');
        return;
      }

      // Đảm bảo có SBD và Year trong request
      const updateSBD = changes['Số Báo Danh'] || query.SBD;
      const updateYear = changes['Năm'] || query.Year;

      // Gọi API cập nhật
      await studentApi.updateStudent(updateSBD, updateYear, changes);
      alert('Cập nhật thành công!');
      navigateHome();
    } catch (error) {
      setError('Lỗi khi cập nhật: ' + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">Cập nhật Thí Sinh</h2>

      {/* Form tìm kiếm */}
      {!studentData && (
        <div className="w-full max-w-md">
          <div className="mb-4">
            <label className="block mb-2">Số Báo Danh:</label>
            <input
              type="text"
              value={query.SBD}
              onChange={(e) => setQuery({ ...query, SBD: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Năm:</label>
            <input
              type="text"
              value={query.Year}
              onChange={(e) => setQuery({ ...query, Year: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            onClick={handleSearch}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
          >
            Tìm kiếm
          </button>
        </div>
      )}

      {/* Hiển thị lỗi */}
      {error && (
        <div className="w-full max-w-md mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Form cập nhật */}
      {studentData && updatedData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-2xl"
        >
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Thông tin thí sinh</h3>
            {Object.entries(updatedData).map(([field, value]) => (
              <div key={field} className="mb-4">
                <label className="block mb-2">{field}:</label>
                <input
                  type="text"
                  value={value || ''}
                  onChange={(e) => handleFieldChange(field, e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
            <button
              onClick={handleUpdate}
              className="w-full px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 mt-4"
            >
              Cập nhật
            </button>
          </motion.div>
        </motion.div>
      )}

      <div className="flex space-x-4 mt-8">
        <button
          onClick={navigateBack}
          className="px-4 py-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600"
        >
          Quay lại
        </button>
        <button
          onClick={navigateHome}
          className="px-4 py-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600"
        >
          Trang chủ
        </button>
      </div>
    </div>
  );
};

export default Update;

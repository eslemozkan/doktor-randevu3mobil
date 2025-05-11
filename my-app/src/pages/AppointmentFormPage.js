import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, faPhone, faCalendarAlt, 
  faNotesMedical, faFileUpload, faClock,
  faHome
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';

function AppointmentFormPage() {
  // Ay ve yıl dizilerini en başa taşı
  const months = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 
    'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 
    'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];
  const currentYear = new Date().getFullYear();

  const navigate = useNavigate();
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(months[new Date().getMonth()]);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    complaint: '',
    selectedDate: '',
    medicalFile: null
  });
  const [unavailableTimes, setUnavailableTimes] = useState([]);

  const today = new Date();

  // Örnek dinamik saat listesi (gerçek senaryoda admin panelden gelecek)
  const availableTimes = [
    '09:00', '10:00', '11:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00'
  ];

  // Günleri oluştur
  const days = Array.from({length: 31}, (_, i) => i + 1);

  // Seçili tarih değiştiğinde unavailable_times'ı çek
  useEffect(() => {
    const fetchUnavailableTimes = async () => {
      if (!formData.selectedDate) return;
      const { data, error } = await supabase
        .from('unavailable_times')
        .select('*')
        .eq('date', formData.selectedDate);
      if (!error && data) {
        setUnavailableTimes(data);
      } else {
        setUnavailableTimes([]);
      }
    };
    fetchUnavailableTimes();
  }, [formData.selectedDate]);

  const handleDateSelect = (day, month, year) => {
    const monthIndex = months.indexOf(month) + 1;
    const formattedDate = `${year}-${monthIndex.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const selected = new Date(`${year}-${monthIndex.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
    if (selected < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
      alert('Geçmiş bir tarih seçilemez!');
      return;
    }
    setSelectedDate(`${day} ${month} ${year}`);
    setFormData(prev => ({...prev, selectedDate: formattedDate}));
    setIsDateModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files ? files[0] : value
    }));
  };

  const handleTimeSelect = (time) => {
    // Eğer seçilen gün bugünün tarihi ise, geçmiş saatler seçilemesin
    if (formData.selectedDate) {
      const selected = new Date(formData.selectedDate);
      const now = new Date();
      if (
        selected.getFullYear() === now.getFullYear() &&
        selected.getMonth() === now.getMonth() &&
        selected.getDate() === now.getDate()
      ) {
        const [hour, minute] = time.split(':').map(Number);
        if (hour < now.getHours() || (hour === now.getHours() && minute <= now.getMinutes())) {
          alert('Geçmiş bir saat seçilemez!');
          return;
        }
      }
    }
    setSelectedTime(time);
    setIsTimeModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Zorunlu alanlar kontrolü
    if (!formData.fullName.trim() || !formData.phoneNumber.trim() || !formData.selectedDate || !selectedTime || !formData.complaint.trim()) {
      alert('Lütfen tüm alanları eksiksiz doldurun!');
      return;
    }
    // Ekstra kontrol: geçmiş tarih/saat engelle
    const selectedDateObj = formData.selectedDate ? new Date(formData.selectedDate) : null;
    if (
      !selectedDateObj ||
      selectedDateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate())
    ) {
      alert('Geçmiş bir tarih için randevu alınamaz!');
      return;
    }
    if (selectedDateObj) {
      const now = new Date();
      if (
        selectedDateObj.getFullYear() === now.getFullYear() &&
        selectedDateObj.getMonth() === now.getMonth() &&
        selectedDateObj.getDate() === now.getDate()
      ) {
        if (selectedTime) {
          const [hour, minute] = selectedTime.split(':').map(Number);
          if (hour < now.getHours() || (hour === now.getHours() && minute <= now.getMinutes())) {
            alert('Geçmiş bir saat için randevu alınamaz!');
            return;
          }
        }
      }
    }
    try {
      let medicalFileUrl = null;
      if (formData.medicalFile) {
        // Dosya yükle
        const fileExt = formData.medicalFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('medical-files')
          .upload(fileName, formData.medicalFile);
        if (uploadError) throw uploadError;
        medicalFileUrl = supabase.storage.from('medical-files').getPublicUrl(fileName).data.publicUrl;
      }
      // Randevu kaydı oluştur
      const { data: userData } = await supabase.auth.getUser();
      const userEmail = userData?.user?.email || null;
      const { error: insertError } = await supabase
        .from('appointments')
        .insert([
          {
            full_name: formData.fullName,
            phone_number: formData.phoneNumber,
            date: formData.selectedDate,
            time: selectedTime,
            complaint: formData.complaint,
            medical_file_url: medicalFileUrl,
            status: 'Beklemede',
            email: userEmail,
          },
        ]);
      if (insertError) throw insertError;
      alert('Randevu talebiniz başarıyla alındı!');
      navigate('/');
    } catch (err) {
      alert('Hata: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5F7FA] to-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#394C8C 7%, transparent 7%)',
          backgroundSize: '50px 50px'
        }}
      ></div>

      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center space-x-1 text-[#394C8C] hover:text-[#5A70B9] transition-colors z-20 text-sm"
      >
        <FontAwesomeIcon icon={faHome} className="text-lg" />
        <span className="text-xs md:text-sm">Ana Sayfa</span>
      </button>

      <div className="relative z-10 max-w-xl w-full space-y-8 bg-white p-8 md:p-16 rounded-3xl shadow-2xl border border-[#394C8C]/10 transform transition-all duration-300 hover:scale-[1.01]">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-[#394C8C]/10 p-4 md:p-6 rounded-full">
              <FontAwesomeIcon 
                icon={faCalendarAlt} 
                className="text-4xl md:text-6xl text-[#394C8C] opacity-80" 
              />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#394C8C] mb-3 tracking-tight">
            Randevu Oluştur
          </h2>
          <p className="text-sm text-gray-600 max-w-md mx-auto opacity-75">
            Size uygun olan tarih ve saati seçin
          </p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ad Soyad */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FontAwesomeIcon 
                  icon={faUser} 
                  className="text-[#394C8C] opacity-70 group-focus-within:opacity-100 transition-all" 
                />
              </div>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="appearance-none rounded-xl relative block w-full px-12 py-3 md:py-4 border border-gray-300 
                           placeholder-gray-500 text-gray-900 focus:outline-none 
                           focus:ring-2 focus:ring-[#394C8C] focus:border-[#394C8C] 
                           transition duration-300 ease-in-out 
                           hover:shadow-sm group-focus-within:shadow-md
                           placeholder:text-left"
                placeholder="Ad Soyad"
              />
            </div>

            {/* Telefon Numarası */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FontAwesomeIcon 
                  icon={faPhone} 
                  className="text-[#394C8C] opacity-70 group-focus-within:opacity-100 transition-all" 
                />
              </div>
              <input
                type="tel"
                name="phoneNumber"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                className="appearance-none rounded-xl relative block w-full px-12 py-3 md:py-4 border border-gray-300 
                           placeholder-gray-500 text-gray-900 focus:outline-none 
                           focus:ring-2 focus:ring-[#394C8C] focus:border-[#394C8C] 
                           transition duration-300 ease-in-out 
                           hover:shadow-sm group-focus-within:shadow-md
                           placeholder:text-left"
                placeholder="Telefon Numarası (Başında 0 olmadan)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tarih Seçimi */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FontAwesomeIcon 
                  icon={faCalendarAlt} 
                  className="text-[#394C8C] opacity-70 group-focus-within:opacity-100 transition-all" 
                />
              </div>
              <button
                type="button"
                onClick={() => setIsDateModalOpen(true)}
                className="appearance-none rounded-xl relative block w-full px-12 py-3 md:py-4 border border-gray-300 
                           placeholder-gray-500 text-gray-900 focus:outline-none 
                           focus:ring-2 focus:ring-[#394C8C] focus:border-[#394C8C] 
                           transition duration-300 ease-in-out text-left
                           hover:shadow-sm"
              >
                {selectedDate ? `Seçilen Tarih: ${selectedDate}` : 'Tarih Seç'}
              </button>
            </div>

            {/* Saat Seçimi */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FontAwesomeIcon 
                  icon={faClock} 
                  className="text-[#394C8C] opacity-70 group-focus-within:opacity-100 transition-all" 
                />
              </div>
              <button
                type="button"
                onClick={() => setIsTimeModalOpen(true)}
                className="appearance-none rounded-xl relative block w-full px-12 py-3 md:py-4 border border-gray-300 
                           placeholder-gray-500 text-gray-900 focus:outline-none 
                           focus:ring-2 focus:ring-[#394C8C] focus:border-[#394C8C] 
                           transition duration-300 ease-in-out text-left
                           hover:shadow-sm"
              >
                {selectedTime ? `Seçilen Saat: ${selectedTime}` : 'Saat Seç'}
              </button>
            </div>
          </div>

          {/* Dosya Yükleme */}
          <div className="relative group">
            <div className="text-xs text-gray-500 mb-2 text-center">
              Tahlil sonuçlarınızı PDF veya görüntü formatında yükleyebilirsiniz
            </div>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FontAwesomeIcon 
                icon={faFileUpload} 
                className="text-[#394C8C] opacity-70 group-focus-within:opacity-100 transition-all absolute top-[65%] transform -translate-y-1/2 text-base" 
              />
            </div>
            <input
              type="file"
              name="medicalFile"
              onChange={handleChange}
              className="appearance-none rounded-xl relative block w-full px-12 py-3 md:py-4 border border-gray-300 
                         placeholder-gray-500 text-gray-900 focus:outline-none 
                         focus:ring-2 focus:ring-[#394C8C] focus:border-[#394C8C] 
                         transition duration-300 ease-in-out 
                         hover:shadow-sm group-focus-within:shadow-md
                         file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                         file:text-sm file:font-semibold file:bg-[#394C8C]/10 file:text-[#394C8C]
                         hover:file:bg-[#394C8C]/20"
              placeholder="Tahlil Sonuçları"
            />
          </div>

          {/* Şikayet Açıklaması */}
          <div className="relative group">
            <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
              <FontAwesomeIcon 
                icon={faNotesMedical} 
                className="text-[#394C8C] opacity-70 group-focus-within:opacity-100 transition-all" 
              />
            </div>
            <textarea
              name="complaint"
              value={formData.complaint}
              onChange={handleChange}
              className="appearance-none rounded-xl relative block w-full px-12 py-4 border border-gray-300 
                         placeholder-gray-500 text-gray-900 focus:outline-none 
                         focus:ring-2 focus:ring-[#394C8C] focus:border-[#394C8C] 
                         transition duration-300 ease-in-out min-h-[200px]
                         hover:shadow-sm group-focus-within:shadow-md"
              placeholder="Şikayetinizi detaylı olarak açıklayın"
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 md:py-4 px-6 
                         border border-transparent text-lg font-bold rounded-full 
                         text-white bg-gradient-to-r from-[#394C8C] to-[#5A70B9]
                         hover:from-[#5A70B9] hover:to-[#394C8C]
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#394C8C]
                         transform transition duration-300 hover:scale-[1.02] 
                         hover:shadow-xl active:scale-95"
            >
              Randevu Talebi Gönder
            </button>
          </div>
        </form>
      </div>

      {/* Tarih Seçim Modalı */}
      {isDateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full">
            <h3 className="text-2xl font-bold text-[#394C8C] mb-4">Tarih Seçin</h3>
            <div className="flex gap-2 mb-4">
              <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} className="border rounded px-2 py-1">
                {months.map(month => <option key={month} value={month}>{month}</option>)}
              </select>
              <select value={selectedYear} onChange={e => setSelectedYear(Number(e.target.value))} className="border rounded px-2 py-1">
                {[currentYear, currentYear + 1].map(year => <option key={year} value={year}>{year}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {days.map((day) => {
                const monthIndex = months.indexOf(selectedMonth);
                const isPast =
                  selectedYear < today.getFullYear() ||
                  (selectedYear === today.getFullYear() && monthIndex < today.getMonth()) ||
                  (selectedYear === today.getFullYear() && monthIndex === today.getMonth() && day < today.getDate());

                return (
                  <button
                    key={day}
                    onClick={() => !isPast && handleDateSelect(day, selectedMonth, selectedYear)}
                    disabled={isPast}
                    className={`py-2 px-4 rounded-lg transition-all duration-300
                      ${isPast
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'hover:bg-[#5A70B9] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#394C8C]'}`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setIsDateModalOpen(false)}
              className="mt-4 w-full py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Kapat
            </button>
          </div>
        </div>
      )}

      {/* Saat Seçim Modalı */}
      {isTimeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full">
            <h3 className="text-2xl font-bold text-[#394C8C] mb-4">Saat Seçin</h3>
            <div className="grid grid-cols-4 gap-4">
              {availableTimes.map((time) => {
                let isPast = false;
                if (formData.selectedDate) {
                  const selected = new Date(formData.selectedDate);
                  const now = new Date();
                  if (
                    selected.getFullYear() === now.getFullYear() &&
                    selected.getMonth() === now.getMonth() &&
                    selected.getDate() === now.getDate()
                  ) {
                    const [hour, minute] = time.split(':').map(Number);
                    if (hour < now.getHours() || (hour === now.getHours() && minute <= now.getMinutes())) {
                      isPast = true;
                    }
                  }
                }
                // Unavailable kontrolü
                let isUnavailable = false;
                unavailableTimes.forEach((row) => {
                  const [startHour, startMinute] = row.start_time.split(':').map(Number);
                  const [endHour, endMinute] = row.end_time.split(':').map(Number);
                  const [tHour, tMinute] = time.split(':').map(Number);
                  const t = tHour * 60 + tMinute;
                  const start = startHour * 60 + startMinute;
                  const end = endHour * 60 + endMinute;
                  if (t >= start && t < end) {
                    isUnavailable = true;
                  }
                });
                const disabled = isPast || isUnavailable;
                return (
                  <button
                    key={time}
                    onClick={() => !disabled && handleTimeSelect(time)}
                    disabled={disabled}
                    className={`py-2 px-4 rounded-lg transition-all duration-300 \
                      ${selectedTime === time ? 'bg-[#394C8C] text-white' : ''} \
                      ${disabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-[#5A70B9] hover:text-white'}`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setIsTimeModalOpen(false)}
              className="mt-4 w-full py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppointmentFormPage;

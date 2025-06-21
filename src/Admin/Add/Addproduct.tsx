import { useState } from 'react';
import axios from 'axios';

const AddFunctionalFood = () => {
  const [form, setForm] = useState({
    NameFood: '',
    ImageFood: '',
    Benefit: '',
    Instructions: '',
    Alert: '',
    TypeID: '',
    PriceFoods: '',
    Rating: '',
    Sold: '',
    Discount: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/products/add', form);
      setMessage(res.data.message);
      setForm({
        NameFood: '',
        ImageFood: '',
        Benefit: '',
        Instructions: '',
        Alert: '',
        TypeID: '',
        PriceFoods: '',
        Rating: '',
        Sold: '',
        Discount: ''
      });
    } catch (err) {
      setMessage('Thêm sản phẩm thất bại');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: '0 auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
      <h2>Thêm sản phẩm thực phẩm chức năng</h2>
      <input name="NameFood" placeholder="Tên sản phẩm" value={form.NameFood} onChange={handleChange} required />
      <input name="ImageFood" placeholder="Link ảnh" value={form.ImageFood} onChange={handleChange} required />
      <textarea name="Benefit" placeholder="Công dụng" value={form.Benefit} onChange={handleChange} required />
      <textarea name="Instructions" placeholder="Hướng dẫn sử dụng" value={form.Instructions} onChange={handleChange} required />
      <textarea name="Alert" placeholder="Cảnh báo" value={form.Alert} onChange={handleChange} />
      <input name="TypeID" type="number" placeholder="TypeID" value={form.TypeID} onChange={handleChange} required />
      <input name="PriceFoods" type="number" placeholder="Giá" value={form.PriceFoods} onChange={handleChange} required />
      <input name="Rating" type="number" step="0.1" placeholder="Đánh giá" value={form.Rating} onChange={handleChange} />
      <input name="Sold" type="number" placeholder="Đã bán" value={form.Sold} onChange={handleChange} />
      <input name="Discount" type="number" placeholder="Giảm giá (%)" value={form.Discount} onChange={handleChange} />
      <button type="submit" style={{ marginTop: 16 }}>Thêm sản phẩm</button>
      {message && <div style={{ marginTop: 12, color: 'green' }}>{message}</div>}
    </form>
  );
};

export default AddFunctionalFood;

import styles from './SearchDetail.module.scss';
import classNames from 'classnames/bind';
import Posts from '../../components/Posts/Posts';
import {useLocation} from 'react-router-dom'
const cx=classNames.bind(styles);

export default function SearchDetail() {
 
const location=useLocation();
  
  return (
    <div className={cx('wrapper')}  >
         <div className={cx('title')}>{(location.state?.titleSearch.trim()!='' && location.state?.titleSearch)?location.state?.titleSearch: 'Kết quả tìm kiếm'}</div>
         <div className={cx('description')}>{location.state?.titleSearch? location.state?.titleSearch +' Phòng mới xây, chính chủ gần chợ, trường học, siêu thị, cửa hàng tiện lợi, khu an ninh.':''}</div>
         <div className={cx('content')}>
             <Posts/>
        </div>
    </div>
  )
}

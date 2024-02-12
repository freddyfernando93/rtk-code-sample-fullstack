"use client";

import { useState } from 'react';
import {
  OrderResponse,
  useDeleteOrderByIdMutation,
  useGetOrderByIdQuery
} from '../../api/order/orderApi'
import styles from "./orderDetail.module.css";
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';


toastConfig({ theme: 'dark' });


export const OrderDetail = () => {
  const [currentId, setCurrentId] = useState("1")
  
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderByIdMutation()
  
  const OrderWrapper = ({ id }: { id: string }) => {
    const { data: order, isFetching } = useGetOrderByIdQuery(id)

    return (
      <>
        {isFetching ? 
          <p>Loading Order...</p>
          : 
          <div className={styles.orderContainer}>
            {order ?
              <>
                <OrderJson order={order}/>
                <DeleteButton />
              </>
              : 
              <pre>Order #{id} doesn't exist</pre>
            }
            </div>
        }
        </>
    )
  
  }

  const OrderJson = ({ order }: { order: OrderResponse }) => {
    return (
      <div className={`${styles.orderContainer} ${styles.boxSurface}`}>
          <pre>
            {JSON.stringify(order, null, 2)}
          </pre>
        </div>
    )
  }

  const DeleteButton = () => {
    return (
      <button
        className={styles.boxSurface}
        onClick={() => deleteOrder(currentId).then(() => toast("Order Deleted"))}
        disabled={isDeleting}
      >
        Delete
      </button>
    );
  }

  return (
    <div className={styles.container}>
      <OrderWrapper id={currentId} />
    </div>
  );
};

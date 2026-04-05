"use client";
import React, { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import CountUp from "react-countup";
import socket from "@/lib/socket";
function ViewOpinionItems({ opinion }: { opinion: OpinionType }) {
  const [opinionItems, setOpinionItems] = useState(opinion.opinionItems);
  const [opinionComments, setOpinionComments] = useState(
    opinion.opinionComments,
  );
  const updateCounter = (id: number) => {
    const items = [...opinionItems];
    const findIndex = opinionItems.findIndex((item) => item.id === id);
    if (findIndex !== -1) {
      items[findIndex].count += 1;
    }
    setOpinionItems(items);
  };
  const updateComment = (payload: any) => {
    if (opinionComments && opinionComments.length > 0) {
      setOpinionComments([payload, ...opinionComments]);
    } else {
      setOpinionComments([payload]);
    }
  };
  useEffect(() => {
    const handleCounterUpdate = (data: any) => {
      updateCounter(data?.opinionItemId);
    };

    const handleCommentUpdate = (data: any) => {
      updateComment(data);
    };

    socket.on(`opinionate-${opinion.id}`, handleCounterUpdate);
    socket.on(`opinionate_comment-${opinion.id}`, handleCommentUpdate);

    return () => {
      socket.off(`opinionate-${opinion.id}`, handleCounterUpdate);
      socket.off(`opinionate_comment-${opinion.id}`, handleCommentUpdate);
    };
  }, [opinion.id, opinionItems, opinionComments]);
  return (
    <div className="mt-10">
      <div className="flex flex-wrap lg:flex-nowrap justify-between items-center">
        {opinionItems &&
          opinionItems.length > 0 &&
          opinionItems.map((item, index) => {
            return (
              <Fragment key={index}>
                <div className="w-full max-w-[500px]">
                  <div className="h-[300px] w-full rounded-md border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center">
                    <Image
                      src={getImageUrl(item.image)}
                      height={500}
                      width={500}
                      alt="opinion2"
                      className="w-full h-[300px] object-contain"
                    />
                  </div>
                  <CountUp
                    start={0}
                    end={item.count}
                    duration={2}
                    className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                  />
                </div>
                {index % 2 === 0 && (
                  <h2 className="text-5xl font-extrabold leading-none text-fuchsia-500">
                    VS
                  </h2>
                )}
              </Fragment>
            );
          })}
      </div>
      <div className="mt-4">
        {opinionComments &&
          opinionComments.length > 0 &&
          opinionComments.map((item, index) => (
            <div
              className="w-full md:w-[600px] rounded-lg p-4 bg-muted mb-4"
              key={index}>
              <p className="font-bold">{item.comment}</p>
              <p>{new Date(item.created_at).toDateString()}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ViewOpinionItems;

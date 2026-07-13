"use client";
import React, { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import CountUp from "react-countup";
import socket from "@/lib/socket";
function ViewVersoItems({ verso }: { verso: VersoType }) {
  const [versoItems, setVersoItems] = useState(verso.versoItems);
  const [versoComments, setVersoComments] = useState(
    verso.versoComments,
  );
  const updateCounter = (id: number) => {
    const items = [...versoItems];
    const findIndex = versoItems.findIndex((item) => item.id === id);
    if (findIndex !== -1) {
      items[findIndex].count += 1;
    }
    setVersoItems(items);
  };
  const updateComment = (payload: any) => {
    if (versoComments && versoComments.length > 0) {
      setVersoComments([payload, ...versoComments]);
    } else {
      setVersoComments([payload]);
    }
  };
  useEffect(() => {
    const handleCounterUpdate = (data: any) => {
      updateCounter(data?.versoItemId);
    };

    const handleCommentUpdate = (data: any) => {
      updateComment(data);
    };

    socket.on(`verso-${verso.id}`, handleCounterUpdate);
    socket.on(`verso_comment-${verso.id}`, handleCommentUpdate);

    return () => {
      socket.off(`verso-${verso.id}`, handleCounterUpdate);
      socket.off(`verso_comment-${verso.id}`, handleCommentUpdate);
    };
  }, [verso.id, versoItems, versoComments]);
  return (
    <div className="mt-10">
      <div className="flex flex-wrap lg:flex-nowrap justify-between items-center">
        {versoItems &&
          versoItems.length > 0 &&
          versoItems.map((item, index) => {
            return (
              <Fragment key={index}>
                <div className="w-full max-w-[500px]">
                  <div className="h-[300px] w-full rounded-md border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center">
                    <Image
                      src={getImageUrl(item.image)}
                      height={500}
                      width={500}
                      alt="verso2"
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
        {versoComments &&
          versoComments.length > 0 &&
          versoComments.map((item, index) => (
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

export default ViewVersoItems;

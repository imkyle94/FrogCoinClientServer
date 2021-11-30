import React from "react";

function Storage() {}

Storage.prototype.getItem = function (item) {
  return JSON.parse(window.localStorage.getItem(item));
};

Storage.prototype.setItem = function (item, value) {
  value = JSON.stringify(value);
  return window.localStorage.setItem(item, value);
};

/**
 * @deprecated 이건X
 *
 * @param {*} commentId
 * @param {*} content
 */
Storage.prototype.writeComment = function (commentId, content) {
  const commentList = this.getItem("comment");
  const commentLength = Object.keys(commentList).length;
  for (let i = 0; i < commentLength; i++) {}
};

export default Storage;

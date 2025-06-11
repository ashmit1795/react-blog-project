import React from 'react';
import { Link } from 'react-router-dom';
import storageService from '../../appwrite/storage';

function PostCard({$id, title, featuredImage, status, userId, showStatus = false}) {
  return (
    <Link to={`/post/${$id}`} className="block">
        <div className="w-full max-w-sm bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border">
            <div className="w-full h-48 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={storageService.getFilePreview(featuredImage)}
                alt={title}
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">{title}</h2>
              {showStatus && (
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                    status === "published"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {status.toUpperCase()}
                </span>
              )}
            </div>
        </div>
    </Link>
  )
}

export default PostCard
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library
{
    public class Review
    {
        private Guid id;
        private double rating;
        private long dateTime;
        private string comment;

        public Guid Id { get => id; set => id = value; }
        public double Rating { get => rating; set => rating = value; }
        public long DateTime { get => dateTime; set => dateTime = value; }
        public string Comment { get => comment; set => comment = value; }
    }
}

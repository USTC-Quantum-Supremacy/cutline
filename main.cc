#include <iostream>
#include <fstream>
#include <stdlib.h>
#include <cstring>

using namespace std;

typedef struct
{
    int xsize;
    int ysize;
    int ndeep; // normal depth
    int edeep; // extra depth
    int max;
    int min;
    int q0x;
    int q0y;
    int *area;
    int *cost;
    int *start;
    int *end;
    int *cost2;
    // int *area2;
} inputType;

inputType *scanInput(char *filename)
{
    ifstream infile;
    infile.open(filename);
    inputType *gg = new inputType;
    infile >> gg->xsize;
    infile >> gg->ysize;
    infile >> gg->ndeep;
    infile >> gg->edeep;
    infile >> gg->max;
    infile >> gg->min;
    infile >> gg->q0x;
    infile >> gg->q0y;
    gg->xsize += 2;
    gg->ysize += 2;
    int size = gg->xsize * gg->ysize;
    gg->area = new int[size];
    for (int ii = 0; ii < size; ii++)
    {
        infile >> gg->area[ii];
    }
    gg->cost = new int[size];
    for (int ii = 0; ii < size; ii++)
    {
        infile >> gg->cost[ii];
    }
    gg->start = new int[size];
    for (int ii = 0; ii < size; ii++)
    {
        infile >> gg->start[ii];
    }
    gg->end = new int[size];
    for (int ii = 0; ii < size; ii++)
    {
        infile >> gg->end[ii];
    }
    gg->cost2 = new int[size];
    for (int ii = 0; ii < size; ii++)
    {
        infile >> gg->cost2[ii];
    }
    return gg;
}

int _walkingArea(inputType *gg, int *area2, int sx, int sy)
{
    // check max min etc
    //
    area2[sx * gg->ysize + sy] = 1;
    int xi[] = {-1, 1, 0, 0};
    int yi[] = {0, 0, -1, 1};
    for (int ii = 0; ii < 4; ii++)
    {
        int xx = sx + xi[ii];
        int yy = sy + yi[ii];
        if (area2[xx * gg->ysize + yy] == 0)
        {
            _walkingArea(gg, area2, xx, yy);
        }
    }
    return 0;
}

int check(inputType *gg)
{
    int *area2 = new int[gg->xsize * gg->ysize];
    memcpy(area2, gg->area, gg->xsize * gg->ysize * sizeof(int));
    _walkingArea(gg, area2, gg->q0x, gg->q0y);
    delete area2;
    return 0;
}

int _walkingPath(inputType *gg, int sx, int sy, int precost, int nd, int ed)
{
    // bfs
    gg->area[sx * gg->ysize + sy] = 1;

    int cost = gg->cost[sx * gg->ysize + sy];
    if (precost == 1 && cost == 1)
    {
        if (++ed > gg->edeep)
            return 1;
    }
    else
    {
        if (++nd > gg->ndeep)
            return 1;
    }

    if (gg->end[sx * gg->ysize + sy])
    {
        return check(gg);
    }

    int xi[] = {-1, 1, 1, -1};
    int yi[] = {-1, 1, -1, 1};
    for (int ii = 0; ii < 4; ii++)
    {
        int xx = sx + xi[ii];
        int yy = sy + yi[ii];
        if (gg->area[xx * gg->ysize + yy] == 0)
        {
            // _walkingPath(gg, xx, yy, cost, nd, ed);
        }
    }
    gg->area[sx * gg->ysize + sy] = 0;
    return 0;
}

int findPath(inputType *gg, int sx, int sy)
{
    gg->area[sx * gg->ysize + sy] = 1;

    int cost = gg->cost[sx * gg->ysize + sy];
    int xi[] = {-1, 1, 1, -1};
    int yi[] = {-1, 1, -1, 1};

    for (int ii = 0; ii < 4; ii++)
    {
        int xx = sx + xi[ii];
        int yy = sy + yi[ii];
        if (gg->area[xx * gg->ysize + yy] == 0)
        {
            _walkingPath(gg, xx, yy, cost, 0, 0);
        }
    }
    gg->area[sx * gg->ysize + sy] = 0;
    return 0;
}

int initPath(inputType *gg)
{

    for (int xx = 0; xx < gg->xsize; xx++)
    {
        for (int yy = 0; yy < gg->ysize; yy++)
        {
            if (gg->start[xx * gg->ysize + yy])
            {
                findPath(gg, xx, yy);
            }
        }
    }

    return 0;
}

int main(int argc, char **argv)
{
    auto gg = scanInput(argv[1]);
    initPath(gg);
    delete gg->area;
    delete gg->cost;
    delete gg->start;
    delete gg->end;
    delete gg->cost2;
    delete gg;
    return 0;
}
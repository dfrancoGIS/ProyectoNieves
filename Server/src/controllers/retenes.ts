import {Request, Response, RequestHandler} from 'express'

export const getRetenes = async (req: Request, res: Response) => {
    try {
        res.json({
            msg: 'get retenes'
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({error: error.message});
        } else {
            res.status(500).json({error: 'Unknown error'});
        }
    }
}

export const getReten = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        res.json({
            msg: 'get reten',
            id
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({error: error.message});
        } else {
            res.status(500).json({error: 'Unknown error'});
        }
    }
}

export const deleteReten = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        res.json({
            msg: 'delete reten',
            id
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({error: error.message});
        } else {
            res.status(500).json({error: 'Unknown error'});
        }
    }
}


export const postReten: RequestHandler = async (req, res): Promise<void> => {
    console.log('REQ.BODY:', req.body);  // ✅ Verificar en consola

    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).json({ error: 'No se recibió un cuerpo en la solicitud' });
        return; // ✅ Asegurar que la función termina aquí
    }

    try {
        res.json({
            msg: 'post reten',
            receivedBody: req.body  // ✅ Confirmar los datos recibidos
        });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
}

export const updateReten: RequestHandler = async (req, res): Promise<void> => {
    const { id } = req.params;  // ✅ Extraer el ID de los parámetros
    console.log('REQ.BODY:', req.body);  
    console.log('REQ.PARAMS:', req.params);  

    if (!id) {
        res.status(400).json({ error: 'No se proporcionó un ID válido' });
        return;
    }

    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).json({ error: 'No se recibió un cuerpo en la solicitud' });
        return;
    }

    try {
        // Simulación de actualización
        res.json({
            msg: `Reten con ID ${id} actualizada correctamente`,
            updatedData: req.body  // ✅ Mostrar los datos recibidos
        });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
}
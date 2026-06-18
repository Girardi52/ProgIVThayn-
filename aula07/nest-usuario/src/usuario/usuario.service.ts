import { Injectable, NotFoundException } from '@nestjs/common';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  private usuarios: Usuario[] = [];
  private nextId = 1;

  create(dto: CreateUsuarioDto): Usuario {
    const usuario: Usuario = { id: this.nextId++, ...dto };
    this.usuarios.push(usuario);
    return usuario;
  }

  findAll(): Usuario[] {
    return this.usuarios;
  }

  findOne(id: number): Usuario {
    const usuario = this.usuarios.find((u) => u.id === id);
    if (!usuario) {
      throw new NotFoundException(`Usuário ${id} não encontrado`);
    }
    return usuario;
  }

  update(id: number, dto: UpdateUsuarioDto): Usuario {
    const usuario = this.findOne(id);
    Object.assign(usuario, dto);
    return usuario;
  }

  remove(id: number): void {
    this.findOne(id); // garante que existe, senão lança 404
    this.usuarios = this.usuarios.filter((u) => u.id !== id);
  }
}
